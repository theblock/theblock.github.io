// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransactionType } from '../src/types'; // eslint-disable-line

declare module 'ethereumjs-tx' {
  declare class EthereumTx {
    constructor (tx: TransactionType): EthereumTx;
    sign (privateKey: Buffer): EthereumTx;
    serialize: () => {
      toString: (base: 'hex') => string;
    }
  }

  declare module.exports: typeof EthereumTx;
}
