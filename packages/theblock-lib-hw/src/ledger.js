// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

// import EthereumTx from 'ethereumjs-tx';
import ledger from 'ledgerco';
import u2f from 'u2f-api';

import type { LedgerComms, LedgerEth, LedgerResultGetAddressType, U2FApiResultType } from './types';

const PATH_ETC = "44'/60'/160720'/0'/0";
const PATH_ETH = "44'/60'/0'/0";

if (window.u2f === undefined) {
  window.u2f = u2f;
}

export default class Ledger {
  _instance: ?LedgerEth = null;

  path (chainId: number) {
    switch (chainId) {
      case 61:
        return PATH_ETC;

      default:
        return PATH_ETH;
    }
  }

  createLedgerInstance (): Promise<LedgerEth> {
    if (this._instance) {
      return Promise.resolve(this._instance);
    }

    return ledger.comm_u2f
      .create_async()
      .then((connection: LedgerComms) => {
        this._instance = new ledger.eth(connection); // eslint-disable-line new-cap

        return this._instance;
      })
      .catch((error: Error) => {
        console.error('Ledger:createLedgerInstance', error);

        throw error;
      });
  }

  destroyLedgerInstance () {
    this._instance = null;
  }

  getAddresses (chainId: number): Promise<Array<string>> {
    return this
      .createLedgerInstance()
      .then((instance: LedgerEth) => {
        return instance.getAddress_async(this.path(chainId), true, false);
      })
      .then((result: LedgerResultGetAddressType) => {
        console.log('Ledger:getAddresses', result);

        return [result.address];
      })
      .catch((error: Error) => {
        console.error('Ledger:getAddresses', error);

        throw error;
      });
  }

  static isU2FAvailable (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (window.u2f && !window.u2f.getApiVersion) {
        console.log('Ledger:isU2FAvailable', 'supported, no getApiVersion');

        resolve(true);
      }

      u2f.getApiVersion((version: Error | U2FApiResultType) => {
        if (!version.js_api_version) {
          console.error('Ledger:isU2FAvailable', version);

          reject(version);
        } else {
          console.log('Ledger:isU2FAvailable', 'available with', version);

          resolve(true);
        }
      }, 1000);
    });
  }
}
