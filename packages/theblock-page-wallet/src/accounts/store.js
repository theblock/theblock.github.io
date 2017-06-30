// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, autorun, computed, observable } from 'mobx';

import type { TransactionResultType } from 'theblock-lib-services/src/types';

import accounts from '../store/accounts';
import balanceStore from '../store/balance';
import chainStore from '../store/chains';

export class AccountStore {
  @observable accounts = accounts;
  @observable balance = balanceStore;
  @observable chains = chainStore;
  @observable transactions = [];

  constructor () {
    autorun(() => {
      if (this.balance.balanceBn) {
        this.retrieveTransactions();
      }
    });
  }

  @computed get hasTransactions (): boolean {
    return this.transactions.length !== 0;
  }

  @action setTransactions = (transactions: Array<TransactionResultType>) => {
    this.transactions = transactions;
  }

  retrieveTransactions = () => {
    if (this.accounts.selected) {
      this.setTransactions([]);

      this.chains.selected.explorer.api
        .getTransactions(this.accounts.selected.key)
        .then(this.setTransactions);
    }
  }
}

export default new AccountStore();
