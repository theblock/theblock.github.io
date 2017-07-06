// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransactionType } from '../types';

import { deferPromise, initWorker } from '../promise';

import { createRawTransaction } from './transaction';

const Worker = require('./worker');
const worker = initWorker(Worker);

export {
  createRawTransaction
};

export function signTransaction (transaction: TransactionType, privateKey: ?Buffer): Promise<string> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'signTransaction',
      transaction,
      privateKey
    });
  });
}
