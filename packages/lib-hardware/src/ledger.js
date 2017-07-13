// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import EthereumTx from 'ethereumjs-tx';
import ledger from 'ledgerco';

import type { TransactionType } from '@theblock/lib-util/src/types';
import type { LedgerEthComms, LedgerEth, LedgerResultGetAddressType, LedgerResultSignType } from './types';

import { deferPromise } from '@theblock/lib-util/src/promise';
import { createRawTransaction } from '@theblock/lib-util/src/transaction';

const PATH_ETC = "m/44'/60'/160720'/0'";
const PATH_ETH = "m/44'/60'/0'";

export function getLedgerHDPath (chainId: number, accountIndex?: string) {
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

function createInstance (): Promise<LedgerEth> {
  return deferPromise(async () => {
    try {
      const connection: LedgerEthComms = await ledger.comm_u2f.create_async();

      return new ledger.eth(connection); // eslint-disable-line new-cap
    } catch (error) {
      console.error('Ledger:createInstance', error);

      throw error;
    }
  });
}

function destroyInstance (instance: LedgerEth): Promise<boolean> {
  return deferPromise(async () => {
    try {
      await instance.comm.close_async();
    } catch (error) {
      console.error('Ledger:destroyInstance', error);
    }

    return true;
  });
}

export function getLedgerAddresses (chainId: number): Promise<Array<string>> {
  return deferPromise(async () => {
    try {
      const instance: LedgerEth = await createInstance();
      const { address }: LedgerResultGetAddressType = await instance.getAddress_async(getLedgerHDPath(chainId), true, false);

      console.log('getLedgerAddresses', address);

      await destroyInstance(instance);

      return [address];
    } catch (error) {
      console.error('getLedgerAddresses', error);
    }

    return [];
  });
}

export function signLedgerTransaction (transaction: TransactionType): Promise<string> {
  return deferPromise(async () => {
    try {
      const tx: EthereumTx = createRawTransaction(transaction);

      // set r, s, v values to what Ledger expects
      tx.raw[6] = Buffer.from([transaction.chainId]);
      tx.raw[7] = Buffer.from([]);
      tx.raw[8] = Buffer.from([]);

      const instance: LedgerEth = await createInstance();
      const { r, s, v }: LedgerResultSignType = await instance.signTransaction_async(
        getLedgerHDPath(transaction.chainId),
        tx.serialize().toString('hex')
      );

      // set received r, s, v values
      tx.r = Buffer.from(r, 'hex');
      tx.s = Buffer.from(s, 'hex');
      tx.v = Buffer.from(v, 'hex');

      const txRaw: string = `0x${tx.serialize().toString('hex')}`;

      await destroyInstance(instance);

      return txRaw;
    } catch (error) {
      console.error('signLedgerTransaction', error);

      throw error;
    }
  });
}
