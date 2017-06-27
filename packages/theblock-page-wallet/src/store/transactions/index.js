// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, computed, observable } from 'mobx';

import type { ProviderInterface, TxInputType } from 'theblock-lib-api/src/types';

import Transaction from './transaction';

export class Transactions {
  @observable transactions: Array<Transaction> = [];

  @computed get all (): Array<Transaction> {
    return this.transactions;
  }

  @action addTransaction = (provider: ProviderInterface, txObj: TxInputType): string => {
    const tx: Transaction = new Transaction(provider, txObj);

    this.transactions = this.transactions.concat([tx]);

    return tx.id;
  }
}

export default new Transactions();
