// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

// Adapted for keccack library from https://github.com/flyswatter/eth-ens-namehash/tree/37916c4fa43cb102df48d67b147e9621dfddef71

import uts46 from 'idna-uts46';
import createKeccakHash from 'keccak';

const EMPTY_NAME: string = '0000000000000000000000000000000000000000000000000000000000000000';

function sha3 (value: string | Buffer): string {
  return createKeccakHash('keccak256').update(value).digest().toString('hex');
}

export function normalizeName (name: string): string {
  return name
    ? uts46.toUnicode(name, {
      useStd3ASCII: true,
      transitional: false
    })
    : name;
}

export function createNameHash (name: string): string {
  const normalizedName: string = normalizeName(name);
  const nodeSha3: string = normalizedName
    ? normalizedName
        .split('.')
        .reverse()
        .reduce((result, label) => {
          return sha3(Buffer.from(`${result}${sha3(label)}`, 'hex'));
        }, EMPTY_NAME)
    : EMPTY_NAME;

  return `0x${nodeSha3}`;
}
