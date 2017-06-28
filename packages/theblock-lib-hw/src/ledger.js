// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';
import ledger from 'ledgerco';
import u2f from 'u2f-api';

import type { TransactionType } from 'theblock-lib-util/src/types';
import type { LedgerComms, LedgerEth, LedgerResultGetAddressType, LedgerResultSignType, U2FApiResultType } from './types';

import { createRawTransaction } from 'theblock-lib-util/src/transaction';

const PATH_ETC = "44'/60'/160720'/0'/0";
const PATH_ETH = "44'/60'/0'/0";

if (window.u2f === undefined) {
  window.u2f = u2f;
}

export default class Ledger {
  path (chainId: number) {
    switch (chainId) {
      case 61:
        return PATH_ETC;

      default:
        return PATH_ETH;
    }
  }

  createLedgerInstance (): Promise<LedgerEth> {
    return ledger.comm_u2f
      .create_async()
      .then((connection: LedgerComms) => {
        return new ledger.eth(connection); // eslint-disable-line new-cap
      })
      .catch((error: Error) => {
        console.error('Ledger:createLedgerInstance', error);

        throw error;
      });
  }

  destroyLedgerInstance (instance: LedgerEth): Promise<boolean> {
    if (!instance) {
      return Promise.resolve(true);
    }

    return instance.comm
      .close_async()
      .catch((error) => {
        console.error('Ledger:destroyLedgerInstance', error);
      })
      .then(() => {
        return true;
      });
  }

  getAddresses (chainId: number): Promise<Array<string>> {
    return this
      .createLedgerInstance()
      .then((instance: LedgerEth) => {
        return instance
          .getAddress_async(this.path(chainId), true, false)
          .then(({ address }: LedgerResultGetAddressType) => {
            console.log('Ledger:getAddresses', address);

            return [address];
          })
          .then((addresses) => {
            return this
              .destroyLedgerInstance(instance)
              .then(() => {
                return addresses;
              });
          });
      })
      .catch((error: Error) => {
        console.error('Ledger:getAddresses', error);

        throw error;
      });
  }

  signTransaction (transaction: TransactionType): Promise<string> {
    const tx: EthereumTx = createRawTransaction(transaction);

    return this
      .createLedgerInstance()
      .then((instance: LedgerEth) => {
        return instance
          .signTransaction_async(
            this.path(transaction.chainId),
            tx.serialize().toString('hex')
          )
          .then(({ r, s, v }: LedgerResultSignType) => {
            tx.r = Buffer.from(r, 'hex');
            tx.s = Buffer.from(s, 'hex');
            tx.v = Buffer.from(v, 'hex');

            return this
              .destroyLedgerInstance(instance)
              .then(() => {
                return `0x${tx.serialize().toString('hex')}`;
              });
          });
      })
      .catch((error: Error) => {
        console.error('Ledger:signTransaction', error);

        throw error;
      });
  }

  static isU2FAvailable (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!window.u2f.getApiVersion) {
        console.log('Ledger:isU2FAvailable', 'supported, no getApiVersion');

        return resolve(true);
      }

      u2f.getApiVersion((version: Error | U2FApiResultType) => {
        if (!version.js_api_version) {
          console.error('Ledger:isU2FAvailable', version);

          return reject(version);
        }

        console.log('Ledger:isU2FAvailable', 'available with', version);

        resolve(true);
      }, 1000);
    });
  }
}
