// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';
import ledger from 'ledgerco';

import type { TransactionType } from 'theblock-lib-util/src/types';
import type { LedgerEthComms, LedgerEth, LedgerResultGetAddressType, LedgerResultSignType } from './types';

import { deferPromise } from 'theblock-lib-util/src/promise';
import { createRawTransaction } from 'theblock-lib-util/src/transaction';

const PATH_ETC = "44'/60'/160720'/0'/0";
const PATH_ETH = "44'/60'/0'/0";

function getPath (chainId: number) {
  switch (chainId) {
    case 61:
      return PATH_ETC;

    default:
      return PATH_ETH;
  }
}

function createInstance (): Promise<LedgerEth> {
  return deferPromise(() => {
    return ledger.comm_u2f
      .create_async()
      .then((connection: LedgerEthComms) => {
        return new ledger.eth(connection); // eslint-disable-line new-cap
      })
      .catch((error: Error) => {
        console.error('Ledger:createInstance', error);

        throw error;
      });
  });
}

function destroyInstance (instance: LedgerEth): Promise<boolean> {
  if (!instance) {
    return Promise.resolve(true);
  }

  return deferPromise(() => {
    return instance.comm
      .close_async()
      .catch((error) => {
        console.error('Ledger:destroyInstance', error);
      })
      .then(() => {
        return true;
      });
  });
}

export function getLedgerAddresses (chainId: number): Promise<Array<string>> {
  return deferPromise(() => {
    return createInstance().then((instance: LedgerEth) => {
      return instance
        .getAddress_async(getPath(chainId), true, false)
        .then(({ address }: LedgerResultGetAddressType) => {
          console.log('getLedgerAddresses', address);

          return destroyInstance(instance).then(() => {
            return [address];
          });
        });
    })
    .catch((error: Error) => {
      console.error('getLedgerAddresses', error);

      return [];
    });
  });
}

export function signLedgerTransaction (transaction: TransactionType): Promise<string> {
  return deferPromise(() => {
    const tx: EthereumTx = createRawTransaction(transaction);

    console.log('inputTx', tx);

    return createInstance().then((instance: LedgerEth) => {
      return instance
        .signTransaction_async(
          getPath(transaction.chainId),
          tx.serialize().toString('hex')
        )
        .then((result: LedgerResultSignType) => {
          console.log('result', result);

          const { r, s, v } = result;

          tx.r = Buffer.from(r, 'hex');
          tx.s = Buffer.from(s, 'hex');
          tx.v = Buffer.from(v, 'hex');

          console.log('signedTx', tx);

          const txRaw: string = `0x${tx.serialize().toString('hex')}`;

          return destroyInstance(instance).then(() => {
            return txRaw;
          });
        });
    })
    .catch((error: Error) => {
      console.error('signLedgerTransaction', error);

      throw error;
    });
  });
}
