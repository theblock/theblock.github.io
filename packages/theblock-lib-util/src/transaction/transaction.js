// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';

import type { TransactionType } from '../types';

export function signTransaction (transaction: TransactionType, _privateKey: ?Buffer): Promise<string> {
  const privateKey: Buffer = Buffer.from(_privateKey || []);

  return new Promise((resolve, reject) => {
    if (!privateKey.length) {
      return resolve('0x');
    }

    try {
      transaction.r = Buffer.from(transaction.r || [transaction.chainId]);
      transaction.s = Buffer.from(transaction.s || [0]);
      transaction.v = Buffer.from(transaction.v || [0]);

      const tx = new EthereumTx(transaction);

      tx.sign(privateKey);

      return resolve(`0x${tx.serialize().toString('hex')}`);
    } catch (error) {
      reject(error);
    }
  });
}
