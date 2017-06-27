// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import ethutil from 'ethereumjs-util';
import createKeccakHash from 'keccak';

import type { WalletType } from '../types';

import { fromBytesToHex } from '../convert';
import { formatAddress } from '../format';

export function walletFromPrivateKey (privateKey: Buffer, checkZero: boolean): ?WalletType {
  const publicBuf: Array<number> = ethutil.privateToPublic(privateKey).slice(-64);
  const addressBuf: Array<number> = ethutil.publicToAddress(publicBuf).slice(-40);

  if (!checkZero || !addressBuf[0]) {
    return {
      address: formatAddress(fromBytesToHex(addressBuf)),
      privateKey
    };
  }

  return null;
}

export function walletFromPhrase (phrase: string): Promise<WalletType> {
  return new Promise((resolve, reject) => {
    try {
      let wallet: WalletType = {};
      let count: number = 16384;
      let privateKey: Buffer = createKeccakHash('keccak256').update(
        phrase
          .toLowerCase()
          .split(/\s+/)
          .map((part) => part.trim())
          .filter((part) => part.length)
          .join(' ')
      ).digest();

      while (count--) {
        privateKey = createKeccakHash('keccak256').update(privateKey).digest();
      }

      while (!wallet.privateKey) {
        privateKey = createKeccakHash('keccak256').update(privateKey).digest();
        wallet = walletFromPrivateKey(privateKey, true) || {};
      }

      resolve(wallet);
    } catch (error) {
      reject(error);
    }
  });
}
