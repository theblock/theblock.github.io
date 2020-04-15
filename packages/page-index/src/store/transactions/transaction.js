// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import { action, computed, observable } from 'mobx';

import type { DecodedDataType, ProviderInterface, ReceiptOutputType, TxInputType } from '@theblock/lib-api/src/types';
import type { TxStateType } from './types';

import Api from '@theblock/lib-api/src';
import { fromBnToDec, fromBnToHex, fromDecToHex, fromHexToBn, fromHexToDec } from '@theblock/lib-util/src/convert';
import { formatAddress, formatFloat } from '@theblock/lib-util/src/format';

import i18n from '../../i18n';
import accountStore from '../accounts';
import balanceStore from '../balance';
import chainStore from '../chains';
import tokenStore from '../tokens';

const TX_POLL_TIMEOUT = 7500;

let nextId = 0;

export default class Transaction {
  @observable decoded: ?DecodedDataType = null;
  @observable error: string = '';
  @observable id: string = fromDecToHex(++nextId);
  @observable isClosed: boolean = false;
  @observable isTokenTransfer: boolean = false;
  @observable password: string = '';
  @observable state: TxStateType = 'queued';
  @observable txHash: string = '';
  @observable txReceipt: ?ReceiptOutputType = null;

  api: Api;
  tx: TxInputType;
  pollTxId: number = -1;

  constructor (provider: ProviderInterface, tx: TxInputType) {
    this.api = new Api(provider);
    this.tx = tx;

    this.api
      .decodeData(this.tx.data)
      .then(this.setDecoded)
      .catch(console.error);
  }

  @computed get receiptBlockNumber (): string {
    return this.txReceipt && this.txReceipt.blockNumber
      ? fromBnToDec(this.txReceipt.blockNumber.toString(10))
      : '';
  }

  @computed get isVisible (): boolean {
    return !this.isClosed;
  }

  @computed get hasError (): boolean {
    return !!this.error;
  }

  @computed get hasPassword (): boolean {
    return !!this.password;
  }

  @computed get txDataFormatted (): string {
    return !this.tx.data || fromHexToBn(this.tx.data).isZero()
      ? ''
      : this.tx.data;
  }

  @computed get txGasLimitBn (): BN {
    return fromHexToBn(this.tx.gas);
  }

  @computed get txGasLimitFormatted (): string {
    return fromHexToDec(this.tx.gas);
  }

  @computed get txGasPriceBn (): BN {
    return fromHexToBn(this.tx.gasPrice);
  }

  @computed get txGasPriceFormatted (): string {
    return formatFloat(this.txGasPriceBn, 9, 3);
  }

  @computed get txFromFormatted (): string {
    return formatAddress(this.tx.from);
  }

  @computed get txToFormatted (): string {
    return formatAddress(this.tx.to);
  }

  @computed get txValueBn (): BN {
    return fromHexToBn(this.tx.value);
  }

  @computed get txValueFormatted (): string {
    return this.txValueBn.isZero()
      ? ''
      : formatFloat(this.txValueBn, 18, 6);
  }

  @computed get txTotalBn (): BN {
    return this.txValueBn.add(this.txGasLimitBn.mul(this.txGasPriceBn));
  }

  @computed get txTotalFormatted (): string {
    return formatFloat(this.txTotalBn, 18, 6);
  }

  @computed get txTokenToFormatted (): string {
    return this.isTokenTransfer && this.decoded
      ? this.decoded.values[0]
      : formatAddress(this.tx.to);
  }

  @computed get txTokenType (): string {
    return this.isTokenTransfer
      ? this.token.token
      : chainStore.selected.token;
  }

  @computed get txTokenValueFormatted (): string {
    return this.isTokenTransfer && this.decoded
      ? formatFloat(this.decoded.values[1], this.token.decimals, 3)
      : this.txValueFormatted;
  }

  @computed get needsUnlocking (): boolean {
    return accountStore.needsUnlocking(this.tx.from);
  }

  @computed get token (): { decimals: number, token: string } {
    return tokenStore.findByAddress(this.txToFormatted) || {
      decimals: 18,
      token: '???'
    };
  }

  @action setDecoded = (decoded: DecodedDataType) => {
    this.decoded = decoded;
    this.isTokenTransfer = decoded.method === 'transfer(address,uint256)';
  }

  @action setError = ({ message }: Error) => {
    this.error = message;
    this.cancelPollTx();
  }

  @action setPassword = (password: string) => {
    this.password = password;
  }

  @action setTxHash = (txHash: string) => {
    this.txHash = txHash;
    this.pollTxHash();
  }

  @action setState = (state: TxStateType) => {
    this.state = state;
  }

  @action confirm = () => {
    this.setState('confirming');

    this
      .decryptPrivateKey()
      .then(() => this.postTransaction())
      .then(() => {
        this.setState('propagating');
      })
      .catch((error: Error) => {
        console.error('confirm', error);

        this.setState('error');
        this.setError(error);

        throw error;
      });
  }

  @action reject = () => {
    this.setState('rejected');
  }

  @action close = () => {
    this.isClosed = true;
    this.cancelPollTx();
  }

  @action setTxReceipt = (txReceipt: ReceiptOutputType) => {
    this.txReceipt = txReceipt;
    this.setState('completed');

    balanceStore.retrieveTokenBalance();
  }

  cancelPollTx = () => {
    if (this.pollTxId !== -1) {
      clearTimeout(this.pollTxId);
    }
  }

  pollTxHash = () => {
    if (this.isClosed || this.hasError) {
      return;
    }

    this.api
      .getReceipt(this.txHash)
      .then((txReceipt: ?ReceiptOutputType) => {
        if (txReceipt && txReceipt.blockNumber && !txReceipt.blockNumber.isZero()) {
          this.pollTxId = -1;
          this.setTxReceipt(txReceipt);
        } else {
          this.pollTxId = setTimeout(this.pollTxHash, TX_POLL_TIMEOUT);
        }
      })
      .catch((error) => {
        console.error('getReceipt', error);

        this.pollTxId = setTimeout(this.pollTxHash, TX_POLL_TIMEOUT);
      });
  }

  decryptPrivateKey = (): Promise<boolean> => {
    if (!this.needsUnlocking) {
      return Promise.resolve(true);
    }

    this.setState('decrypting');

    return accountStore
      .unlockAccount(this.tx.from, this.password)
      .catch((error: Error) => {
        console.error('unlockAccount', error);

        throw new Error(i18n.t('tx:errors.decrypt', { message: error.message }));
      });
  }

  postTransaction = (): Promise<string> => {
    this.setState('nonce');

    const { data, from, to, gas, gasPrice, value } = this.tx;

    return this.api
      .getNonce(from)
      .catch((error) => {
        console.error('getNonce', error);

        throw new Error(i18n.t('tx:errors.nonce', { message: error.message }));
      })
      .then((nonce) => {
        this.setState(
          accountStore.isHardware(from)
            ? 'signingHardware'
            : 'signing'
        );

        const chainId: number = chainStore.selected.chainId;

        return accountStore
          .signTransaction(from, {
            chainId,
            data,
            gasPrice,
            gasLimit: gas,
            nonce: fromBnToHex(nonce),
            to,
            value,
            r: Buffer.from([chainId]),
            s: Buffer.from([0]),
            v: Buffer.from([0])
          })
          .catch((error) => {
            console.error('signTransaction', error);

            throw new Error(i18n.t('tx:errors.sign', { message: error.message }));
          })
          .then((rawTx: string) => {
            this.setState('sending');

            return this.api
              .sendRawTransaction(rawTx)
              .then((txHash: string) => {
                this.setTxHash(txHash);

                return txHash;
              })
              .catch((error) => {
                console.error('sendRawTransaction', error);

                throw new Error(i18n.t('tx:errors.sendRaw', { message: error.message }));
              });
          });
      });
  }
}
