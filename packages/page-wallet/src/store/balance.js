// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import { action, autorun, computed, observable } from 'mobx';

import type { PriceResultType } from '@theblock/lib-services/src/types';

import { fromFloatToBn } from '@theblock/lib-util/src/convert';
import { formatFloat } from '@theblock/lib-util/src/format';

import accountStore from '../store/accounts';
import chainStore from '../store/chains';
import currencyStore from '../store/currencies';
import tokenStore from '../store/tokens';

const CENTS: BN = new BN(10000);
const ZERO: BN = new BN(0);

export class BalanceStore {
  @observable accounts = accountStore;
  @observable chains = chainStore;
  @observable currencies = currencyStore;
  @observable tokens = tokenStore;
  @observable balance: string = '';
  @observable prices: PriceResultType = {};

  constructor () {
    autorun(this.retrieveTokenBalance);
    autorun(this.retrieveTokenPrice);
  }

  @computed get balanceBn (): BN {
    return fromFloatToBn(this.balance, this.tokens.selected.decimals);
  }

  @computed get balanceFormatted (): string {
    return formatFloat(this.balanceBn, this.tokens.selected.decimals, 4);
  }

  @computed get balanceFiatFormatted (): string {
    return this.tokenFiatPrice.isZero() || this.balanceBn.isZero()
      ? '-'
      : formatFloat(
        this.tokenFiatPrice.mul(this.balanceBn).divRound(CENTS), this.tokens.selected.decimals, 2, true
      );
  }

  @computed get isLoading (): boolean {
    return !this.balance;
  }

  @computed get tokenFiatPrice (): BN {
    return this.prices[this.currencies.selected.key] || ZERO;
  }

  @action setBalance = (balance: string) => {
    this.balance = balance;
  }

  @action setPrices = (prices: PriceResultType) => {
    this.prices = prices;
  }

  retrieveTokenPrice = () => {
    if (this.tokens.selected) {
      this.chains.selected.api
        .getTokenPrice(this.tokens.selected.token, this.currencies.all)
        .then((prices: PriceResultType) => {
          this.setPrices(prices);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  retrieveTokenBalance = () => {
    if (this.accounts.selected && this.chains.selected && this.tokens.selected) {
      this.setBalance('');

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
