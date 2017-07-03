// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

// Adapted for keccack library (instead of js-sha3) from https://github.com/flyswatter/eth-ens-namehash/tree/37916c4fa43cb102df48d67b147e9621dfddef71

import uts46 from 'idna-uts46';
import createKeccakHash from 'keccak';

const EMPTY_NAME: string = '0000000000000000000000000000000000000000000000000000000000000000';

function sha3 (value: string | Buffer): string {
  return createKeccakHash('keccak256').update(value).digest().toString('hex');
}

export function createNameHash (name?: ?string): string {
  const nodeSha3: string = uts46
    .toUnicode((name || '').trim(), {
      transitional: false,
      useStd3ASCII: true,
      verifyDnsLength: false
    })
    .split('.')
    .reverse()
    .reduce((result, label) => {
      return label
        ? sha3(Buffer.from(`${result}${sha3(label)}`, 'hex'))
        : result;
    }, EMPTY_NAME);

  console.log('createNameHash', `0x${nodeSha3}`);

  return `0x${nodeSha3}`;
}
