// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransactionResultType } from './types';

export default class Gastracker {
  url: string = 'https://gastracker.io/';

  getTransactions (address: string): Promise<Array<TransactionResultType>> {
    return Promise.resolve([]);
  }

  linkAddress (address: string): string {
    return `${this.url}addr/${address}`;
  }

  linkBlockNumber (blockNumber: string): string {
    return `${this.url}block/${blockNumber}`;
  }

  linkTransaction (txHash: string): string {
    return `${this.url}tx/${txHash}`;
  }
}
