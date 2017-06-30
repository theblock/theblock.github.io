// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import { action, autorun, computed, observable } from 'mobx';

import { fromFloatToBn } from 'theblock-lib-util/src/convert';
import { formatFloat } from 'theblock-lib-util/src/format';

import accountStore from '../store/accounts';
import chainStore from '../store/chains';
import currencyStore from '../store/currencies';
import tokenStore from '../store/tokens';

const CENTS: BN = new BN(100);

export class BalanceStore {
  @observable accounts = accountStore;
  @observable chains = chainStore;
  @observable currencies = currencyStore;
  @observable tokens = tokenStore;
  @observable balance: string = '0.0';
  @observable tokenFiatPrice: BN = new BN(0);

  constructor () {
    autorun(this.retrieveTokenBalance);
    autorun(this.retrieveTokenPrice);
  }

  @computed get balanceBn (): BN {
    return fromFloatToBn(this.balance);
  }

  @computed get balanceFormatted (): string {
    return formatFloat(this.balanceBn, 18, 4);
  }

  @computed get balanceFiatFormatted (): string {
    return this.tokenFiatPrice.isZero() || this.balanceBn.isZero()
      ? '-'
      : formatFloat(this.tokenFiatPrice.mul(this.balanceBn).divRound(CENTS), this.tokens.selected.decimals, 2, true);
  }

  @action setBalance = (balance: string) => {
    this.balance = balance;
  }

  @action setTokenFiatPrice = (tokenFiatPrice: BN) => {
    this.tokenFiatPrice = tokenFiatPrice;
  }

  retrieveTokenPrice = () => {
    if (this.chains.selected.api && this.tokens.selected.key && this.currencies.selected.key) {
      this.chains.selected.api
        .getTokenPrice(this.tokens.selected.token, this.currencies.all)
        .then((prices) => {
          this.setTokenFiatPrice(prices[this.currencies.selected.key]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  retrieveTokenBalance = () => {
    if (this.accounts.selected && this.chains.selected.api && this.tokens.selected.key) {
      this.setBalance('0.0');

      (
        this.tokens.selected.address
          ? this.chains.selected.api.getTokenBalance(this.tokens.selected.address, this.accounts.selected.key)
          : this.chains.selected.api.getNetworkBalance(this.accounts.selected.key)
      )
        .then((balance) => {
          this.setBalance(formatFloat(balance, this.tokens.selected.decimals));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}

export default new BalanceStore();
