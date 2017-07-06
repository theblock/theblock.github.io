// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

export type SignatureType = {
  method: string,
  name: string,
  types: Array<string>
};

export type TransactionResultType = {
  blockNumber: BN,
  confirmations: BN,
  data: string,
  from: string,
  gasLimit: BN,
  gasPrice: BN,
  gasUsed: BN,
  hash: string,
  timeStamp: Date,
  to: string,
  value: BN
};

export type ExplorerInterface = {
  getTransactions (address: string): Promise<Array<TransactionResultType>>,
  linkAddress (address: string): string,
  linkBlockNumber (blockNumber: string): string,
  linkTransaction (txHash: string): string
};
