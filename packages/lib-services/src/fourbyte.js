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

const GET_HEADERS = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Accept': 'application/json'
  }
};
const URL: string = 'https://www.4byte.directory/api/v1/';
const cache: CacheType = {
  signatures: defaultSignatures
};

function createUrl (action: string, params: { [string]: string }): string {
  return `${URL}${action}/?${qs.stringify(params)}`;
}

export async function getMethodSignature (_signature: ?string): Promise<SignatureType> {
  const signature: string = _signature
    ? _signature.substr(0, 10) || '0x'
    : '0x';

  if (cache.signatures[signature]) {
    return cache.signatures[signature];
  }

  cache.signatures[signature] = decodeMethodString();

  const response: Response = await fetch(createUrl('signatures', {
    hex_signature: signature
  }), GET_HEADERS);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const { results }: SignatureResponseType = await response.json();
  const value: SignatureType = decodeMethodString(
    results.length
      ? results[0].text_signature
      : ''
  );

  cache.signatures[signature] = value;

  return cache.signatures[signature];
}
