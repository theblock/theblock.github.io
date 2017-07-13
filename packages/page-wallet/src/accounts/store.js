// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, autorun, computed, observable } from 'mobx';

import type { TransactionResultType } from '@theblock/lib-services/src/types';

import accounts from '../store/accounts';
import balanceStore from '../store/balance';
import chainStore from '../store/chains';

export class AccountStore {
  @observable accounts = accounts;
  @observable balance = balanceStore;
  @observable chains = chainStore;
  @observable transactions = [];

  constructor () {
    autorun(this.retrieveTransactions);
  }

  @computed get hasTransactions (): boolean {
    return this.transactions.length !== 0;
  }

  @action setTransactions = (transactions: Array<TransactionResultType>) => {
    this.transactions = transactions;
  }

  retrieveTransactions = async () => {
    if (this.accounts.selected && this.chains.selected && this.balance.isLoading) {
      this.setTransactions([]);

      const transactions: Array<TransactionResultType> = await this.chains.selected.explorer.api.getTransactions(this.accounts.selected.key);

      this.setTransactions(transactions);
    }
  }
}

export default new AccountStore();
