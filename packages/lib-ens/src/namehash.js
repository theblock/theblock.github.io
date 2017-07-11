// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

// Adapted for keccack library (instead of js-sha3) from
// https://github.com/flyswatter/eth-ens-namehash/tree/37916c4fa43cb102df48d67b147e9621dfddef71

import uts46 from 'idna-uts46';
import { createSha3Raw } from '@theblock/lib-util/src/sha3';

const EMPTY_NAME: string = '0000000000000000000000000000000000000000000000000000000000000000';

export function createNameHash (name?: ?string): string {
  const nodeSha3: string = uts46
    .toUnicode((name || '').trim(), {
      transitional: false,
      useStd3ASCII: true,
      verifyDnsLength: false
    })
    .split('.')
    .reverse()
    .map((label) => label.trim())
    .reduce((result, label) => {
      return label
        ? createSha3Raw(Buffer.from(`${result}${createSha3Raw(label)}`, 'hex'))
        : result;
    }, EMPTY_NAME);

  return `0x${nodeSha3}`;
}
