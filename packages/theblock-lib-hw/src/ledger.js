// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

// import EthereumTx from 'ethereumjs-tx';
import ledger from 'ledgerco';
import u2f from 'u2f-api';

import type { LedgerComms, LedgerEth, LedgerResultGetAddressType } from './types';

const PATH_ETC = "44'/60'/160720'/0'/0";
const PATH_ETH = "44'/60'/0'/0";

if (window.u2f === undefined) {
  window.u2f = u2f;
}

export default class Ledger {
  _connection: LedgerComms;
  _instance: LedgerEth;

  path (chainId: number) {
    switch (chainId) {
      case 61:
        return PATH_ETC;

      default:
        return PATH_ETH;
    }
  }

  getLedgerInstance (): Promise<LedgerEth> {
    if (this._instance) {
      return Promise.resolve(this._instance);
    }

    return ledger.comm_u2f
      .create_async()
      .then((connection: LedgerComms) => {
        this._connection = connection;
        this._instance = new ledger.eth(connection); // eslint-disable-line new-cap

        return this._instance;
      })
      .catch((error: Error) => {
        console.error(error);

        throw error;
      });
  }

  getAddresses (chainId: number): Promise<Array<string>> {
    return this
      .getLedgerInstance()
      .then((instance: LedgerEth) => {
        return instance.getAddress_async(this.path(chainId), true, false);
      })
      .then(({ address }: LedgerResultGetAddressType) => {
        return [address.toLowerCase()];
      })
      .catch((error: Error) => {
        console.error(error);

        throw error;
      });
  }

  static isU2FAvailable (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (window.u2f && !window.u2f.getApiVersion) {
        resolve(true);
      }

      u2f.getApiVersion((error: ?Error, version: string) => {
        if (error) {
          console.error(error);

          reject(error);
        } else {
          resolve(true);
        }
      }, 1000);
    });
  }
}
