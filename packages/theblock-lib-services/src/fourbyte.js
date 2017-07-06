// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import qs from 'query-string';

import type { SignatureType } from './types';

import { decodeMethodString, defaultSignatures } from './signatures';

type SignatureEntryType = {
  id: number,
  created_at: string,
  text_signature: string,
  bytes_signature: string,
  hex_signature: string
};

type SignatureResponseType = {
  results: Array<SignatureEntryType>;
};

type CacheType = {
  signatures: {
    [string]: SignatureType
  }
}

const URL: string = 'https://www.4byte.directory/api/v1/';
const cache: CacheType = {
  signatures: defaultSignatures
};

function createUrl (action: string, params: { [string]: string }): string {
  return `${URL}${action}/?${qs.stringify(params)}`;
}

export function getMethodSignature (_signature: ?string): Promise<SignatureType> {
  let signature = '0x';

  if (_signature) {
    signature = _signature.substr(0, 10) || '0x';
  }

  if (cache.signatures[signature]) {
    return Promise.resolve(cache.signatures[signature]);
  }

  const url: string = createUrl('signatures', {
    hex_signature: signature
  });

  return fetch(url, {
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

    return { results: [] };
  })
  .then(({ results }: SignatureResponseType) => {
    const value: SignatureType = decodeMethodString(
      results.length
        ? results[0].text_signature
        : ''
    );

    cache.signatures[signature] = value;

    return value;
  });
}
