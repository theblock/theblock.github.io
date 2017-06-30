// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';
import ethutil from 'ethereumjs-util';
import { TrezorConnect } from 'trezor-connect';

import type { TransactionType } from 'theblock-lib-util/src/types';
import type { TrezorPubKeyResultType, TrezorSignResultType } from './types';

import { fromBytesToHex } from 'theblock-lib-util/src/convert';
import { formatAddress, padHex, removeHexPrefix } from 'theblock-lib-util/src/format';
import { deferPromise } from 'theblock-lib-util/src/promise';
import { createRawTransaction } from 'theblock-lib-util/src/transaction';

const PATH_ETC = "m/44'/61'/0'/0";
const PATH_ETH = "m/44'/60'/0'/0";

export function getTrezorHDPath (chainId: number, accountIndex?: string) {
  let path;

  switch (chainId) {
    case 61:
      path = PATH_ETC;
      break;

    default:
      path = PATH_ETH;
      break;
  }

  return `${path}/${accountIndex || '0'}`;
}

export function getTrezorAddresses (chainId: number): Promise<Array<string>> {
  return deferPromise(() => {
    return new Promise((resolve, reject) => {
      return TrezorConnect.getXPubKey(getTrezorHDPath(chainId), ({ error, success, publicKey }: TrezorPubKeyResultType) => {
        if (!success) {
          console.error('getTrezorAddresses', error);

          reject(new Error(error));
          return;
        }

        try {
          const publicBuf: Buffer = Buffer.from(publicKey, 'hex');
          const addressBuf: Array<number> = ethutil.publicToAddress(publicBuf, true).slice(-40);
          const address: string = formatAddress(fromBytesToHex(addressBuf));

          resolve([address]);
        } catch (error) {
          console.error('getTrezorAddresses', error);

          reject(error);
        }
      }, '1.4.0');
    });
  });
}

export function signTrezorTransaction (transaction: TransactionType): Promise<string> {
  return deferPromise(() => {
    return new Promise((resolve, reject) => {
      const { chainId } = transaction;
      const data = [null, '', '0x'].includes(transaction.data)
        ? null
        : padHex(removeHexPrefix(transaction.data));
      const gasLimit = padHex(removeHexPrefix(transaction.gasLimit));
      const gasPrice = padHex(removeHexPrefix(transaction.gasPrice));
      const nonce = padHex(removeHexPrefix(transaction.nonce));
      const to = padHex(removeHexPrefix(transaction.to));
      const value = padHex(removeHexPrefix(transaction.value));

      console.log('transaction', transaction, nonce, gasPrice, gasLimit, to, value, data, chainId);

      return TrezorConnect.signEthereumTx(getTrezorHDPath(chainId), nonce, gasPrice, gasLimit, to, value, data, chainId, ({ error, success, r, s, v }: TrezorSignResultType) => {
        if (!success) {
          console.error('signTrezorTransaction', error);

          reject(new Error(error));
          return;
        }

        const tx: EthereumTx = createRawTransaction(transaction);

        tx.r = Buffer.from(r, 'hex');
        tx.s = Buffer.from(s, 'hex');
        tx.v = Buffer.from([v]);

        resolve(`0x${tx.serialize().toString('hex')}`);
      });
    });
  });
}
