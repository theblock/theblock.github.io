// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { HDNode, networks } from 'bitcoinjs-lib';
import bip39 from 'bip39';
import ethutil from 'ethereumjs-util';

import type { WalletType } from '../types';

import { fromBytesToHex } from '../convert';
import { formatAddress, trimPhrase } from '../format';
import { createSha3Buffer } from '../sha3';
import { isMnemonicValid } from '../validate';

export function walletFromMnemonic (_mnemonic: string, path: string): Promise<WalletType> {
  const mnemonic: string = trimPhrase(_mnemonic);

  return new Promise((resolve, reject) => {
    if (!isMnemonicValid(mnemonic)) {
      reject(new Error('Invalid mnemonic phrase specified'));
      return;
    }

    const seed: Buffer = bip39.mnemonicToSeed(mnemonic);
    const walletHd = HDNode.fromSeedHex(seed, networks.bitcoin).derivePath(path);
    const wallet: ?WalletType = walletFromPrivateKey(walletHd.keyPair.d.toBuffer(), false);

    if (wallet) {
      resolve(wallet);
    } else {
      reject(new Error('Unable to create wallet from HD pair'));
    }
  });
}

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
      let privateKey: Buffer = createSha3Buffer(trimPhrase(phrase));

      while (count--) {
        privateKey = createSha3Buffer(privateKey);
      }

      while (!wallet.privateKey) {
        privateKey = createSha3Buffer(privateKey);
        wallet = walletFromPrivateKey(privateKey, true) || {};
      }

      resolve(wallet);
    } catch (error) {
      reject(error);
    }
  });
}
