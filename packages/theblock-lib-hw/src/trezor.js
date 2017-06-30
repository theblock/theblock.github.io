// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';
import trezor from 'trezor-connect';

import type { TransactionType } from 'theblock-lib-util/src/types';
import type { TrezorPubKeyResultType, TrezorSignResultType } from './types';

import { deferPromise } from 'theblock-lib-util/src/promise';
import { createRawTransaction } from 'theblock-lib-util/src/transaction';

const PATH_ETC = "m/44'/61'/0'/0";
const PATH_ETH = "m/44'/60'/0'/0";
const PATH_TEST = "m/44'/1'/0'/0";

export function getTrezorHDPath (chainId: number) {
  switch (chainId) {
    case 1:
      return PATH_ETH;

    case 61:
      return PATH_ETC;

    default:
      return PATH_TEST;
  }
}

export function getTrezorAddresses (chainId: number): Promise<Array<string>> {
  return deferPromise(() => {
    return new Promise((resolve, reject) => {
      return trezor.getXPubKey(getTrezorHDPath(chainId), ({ error, success, publicKey }: TrezorPubKeyResultType) => {
        if (!success) {
          console.error('getTrezorAddresses', error);

          reject(error);
          return;
        }

        console.log('getTrezorAddresses', publicKey);

        return [];
      });
    });
  });
}

export function signTrezorTransaction (transaction: TransactionType): Promise<string> {
  return deferPromise(() => {
    return new Promise((resolve, reject) => {
      const { chainId, data, gasPrice, gasLimit, nonce, to, value } = transaction;

      return trezor.signEthereumTx(getTrezorHDPath(chainId), nonce, gasPrice, gasLimit, to, value, data, chainId, ({ error, success, r, s, v }: TrezorSignResultType) => {
        if (!success) {
          console.error('signTrezorTransaction', error);

          reject(error);
          return;
        }

        console.log('signTrezorTransaction: r,s,v', r, s, v);

        const tx: EthereumTx = createRawTransaction(transaction);

        tx.r = Buffer.from(r, 'hex');
        tx.s = Buffer.from(s, 'hex');
        tx.v = Buffer.from([v]);

        return `0x${tx.serialize().toString('hex')}`;
      });
    });
  });
}
