// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import { action, computed, observable } from 'mobx';

import { lookupEnsName } from '@theblock/lib-ens/src/lookup';
import { fromFloatToBn, fromHexToBn } from '@theblock/lib-util/src/convert';
import { formatFloat } from '@theblock/lib-util/src/format';
import { isAddressValid, isEnsName, isHexValid } from '@theblock/lib-util/src/validate';

import accountStore from '../store/accounts';
import addressStore from '../store/addresses';
import balanceStore from '../store/balance';
import chainStore from '../store/chains';
import currencyStore from '../store/currencies';
import tokenStore from '../store/tokens';
import transactionStore from '../store/transactions';
import valueTypeStore from '../store/valueType';

const BN0: BN = new BN(0);
const BN100: BN = new BN(100);

export class SendStore {
  @observable accounts = accountStore;
  @observable addresses = addressStore;
  @observable balance = balanceStore;
  @observable chains = chainStore;
  @observable countBusyLookup: number = 0;
  @observable currencies = currencyStore;
  @observable tokens = tokenStore;
  @observable transactions = transactionStore;
  @observable gasPrice: string = '0';
  @observable gasLimit: string = '0';
  @observable isCompleted: boolean = false;
  @observable isBusySending: boolean = false;
  @observable recipient: string = '';
  @observable recipientAddress: string = '';
  @observable txData: string = '0x';
  @observable txValue: string = '0';
  @observable valueType = valueTypeStore;

  @computed get gasPriceBn (): BN {
    return fromFloatToBn(this.gasPrice, 9);
  }

  @computed get gasLimitBn (): BN {
    return new BN(this.gasLimit);
  }

  @computed get gasLimitFormatted (): string {
    return this.gasLimitBn.isZero()
      ? ''
      : this.gasLimit;
  }

  @computed get gasPriceFormatted (): string {
    return this.gasPriceBn.isZero()
      ? ''
      : formatFloat(this.gasPriceBn, 9, 3);
  }

  @computed get hasError (): boolean {
    return this.hasRecipientError || this.hasTxTotalError || this.hasTxDataError;
  }

  @computed get hasRecipientError (): boolean {
    return !isAddressValid(this.recipientAddress);
  }

  @computed get hasTxTotalError (): boolean {
    return false;
  }

  @computed get hasTxDataError (): boolean {
    return !isHexValid(this.txData);
  }

  @computed get isBusyLookup (): boolean {
    return this.countBusyLookup > 0;
  }

  @computed get txDataBn (): BN {
    return fromHexToBn(this.txData);
  }

  @computed get txDataFormatted (): string {
    return this.txDataBn.isZero()
      ? ''
      : this.txData;
  }

  @computed get txValueBn (): BN {
    return fromFloatToBn(this.txValue, this.tokens.selected.decimals);
  }

  @computed get txValueNativeBn (): BN {
    if (this.valueType.selected.isNative) {
      return this.txValueBn;
    }

    if (this.balance.tokenFiatPrice.isZero()) {
      return BN0;
    }

    return this.txValueBn.mul(BN100).divRound(this.balance.tokenFiatPrice);
  }

  @computed get txValueFormatted (): string {
    return this.txValueBn.isZero()
      ? ''
      : this.txValue;
  }

  @action clear = () => {
    this.countBusyLookup = 0;
    this.gasPrice = '0';
    this.gasLimit = '0';
    this.isCompleted = false;
    this.isBusySending = false;
    this.recipient = '';
    this.recipientAddress = '';
    this.txData = '0x';
    this.txValue = '0';

    this.addresses.clear();
    this.valueType.selectToken();
  }

  @action send = async () => {
    const tx = {
      data: this.txData,
      to: this.recipientAddress,
      from: this.accounts.selected.key,
      value: this.txValueNativeBn,
      gasLimit: this.gasLimitBn,
      gasPrice: this.gasPriceBn
    };

    this.setBusySending(true);

    try {
      this.tokens.selected.address
        ? this.chains.selected.api.sendTokenTransaction(this.tokens.selected.address, tx)
        : this.chains.selected.api.sendTransaction(tx);
      this.clear();
    } catch (error) {
      console.error(error);
    }

    this.setBusySending(false);
  }

  @action decBusyLookup = () => {
    if (this.countBusyLookup) {
      this.countBusyLookup--;
    }
  }

  @action incBusyLookup = () => {
    this.countBusyLookup++;
  }

  @action setBusySending = (isBusy: boolean) => {
    this.isBusySending = isBusy;
  }

  @action setGasPrice = (gasPrice: string) => {
    this.gasPrice = gasPrice;
  }

  @action setGasLimit = (gasLimit: string) => {
    this.gasLimit = gasLimit;
  }

  @action setRecipient = async (recipient: string) => {
    this.recipient = recipient;

    if (isEnsName(recipient)) {
      this.incBusyLookup();

      let recipientAddress: string = '';

      try {
        recipientAddress = await lookupEnsName(chainStore.selected.api, recipient);
      } catch (error) {
      }

      this.decBusyLookup();
      this.setRecipientAddress(recipientAddress);
    } else {
      this.setRecipientAddress(recipient);
    }
  }

  @action setRecipientAddress = (recipientAddress: string) => {
    if (isAddressValid(recipientAddress)) {
      this.recipientAddress = recipientAddress;
    } else {
      this.recipientAddress = '';
    }
  }

  @action setTxData = (txData: string) => {
    this.txData = txData;
  }

  @action setTxValue = (txValue: string) => {
    this.txValue = txValue;
  }
}

export default new SendStore();
