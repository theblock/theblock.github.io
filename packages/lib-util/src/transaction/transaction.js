// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';

import type { TransactionType } from '../types';

export function createRawTransaction (transaction: TransactionType): EthereumTx {
  transaction.r = Buffer.from(transaction.r || [transaction.chainId]);
  transaction.s = Buffer.from(transaction.s || [0]);
  transaction.v = Buffer.from(transaction.v || [0]);

  return new EthereumTx(transaction);
}

export async function signTransaction (transaction: TransactionType, _privateKey: ?Buffer): Promise<string> {
  const privateKey: Buffer = Buffer.from(_privateKey || []);

  if (!privateKey.length) {
    return '0x';
  }

  const tx = createRawTransaction(transaction);

  tx.sign(privateKey);

  return `0x${tx.serialize().toString('hex')}`;
}
