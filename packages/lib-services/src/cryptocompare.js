// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import qs from 'query-string';

import type { PriceResultType } from './types';

type CacheType = {
  price: {
    [string]: PriceResultType
  }
};

const GET_HEADERS = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Accept': 'application/json'
  }
};
const URL: string = 'https://min-api.cryptocompare.com/data/';

const cache: CacheType = {
  price: {}
};

function createUrl (action: string, params: { [string]: string }): string {
  return `${URL}${action}?${qs.stringify(params)}`;
}

export async function getTokenPrice (token: string, currencies: Array<string>): Promise<PriceResultType> {
  if (cache.price[token]) {
    return cache.price[token];
  }

  cache.price[token] = {};

  const response: Response = await fetch(createUrl('price', {
    fsym: token,
    tsyms: currencies.join(',')
  }), GET_HEADERS);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const price: { [string]: number } = await response.json();

  cache.price[token] = (currencies.reduce((result, currency) => {
    result[currency] = new BN((price[currency] || 0) * 100);
    return result;
  }, {}): PriceResultType);

  return cache.price[token];
}
