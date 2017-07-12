// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import qs from 'query-string';

type PriceType = {
  [string]: BN
};

type CacheType = {
  price: PriceType
};

const URL: string = 'https://min-api.cryptocompare.com/data/';

const cache: CacheType = {
  price: {}
};

function createUrl (action: string, params: { [string]: string }): string {
  return `${URL}price?${qs.stringify(params)}`;
}

export function getTokenPrice (token: string, currencies: Array<string>): Promise<BN> {
  if (cache.price[token]) {
    return Promise.resolve(cache.price[token]);
  }

  const url: string = createUrl('price', {
    fsym: token,
    tsyms: currencies.join(',')
  });

  return fetch(
    url,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch((error: Error) => {
      console.error(url, error);

      return {};
    })
    .then((price: { [string]: number }) => {
      cache.price[token] = currencies.reduce((result, currency): PriceType => {
        result[currency] = new BN((price[currency] || 0) * 100);
        return result;
      }, ({}: PriceType));

      return cache.price[token];
    });
}
