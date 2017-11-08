// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

import type { TransactionType } from '../packages/lib-util/src/types';

declare module 'ethereumjs-tx' {
  declare class EthereumTx {
    constructor (tx: TransactionType): EthereumTx;
    raw: Array<Buffer>;
    sign (privateKey: Buffer): EthereumTx;
    serialize: () => {
      toString: (base: 'hex') => string;
    },
    r: Buffer;
    s: Buffer;
    v: Buffer;
  }

  declare module.exports: typeof EthereumTx;
}
