// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { PrivateKeyType, WalletType } from '../types';

import { formatAddress } from '../format';
import { decryptPrivateKey } from '../keys';
import { deferPromise, initWorker } from '../promise';

const Worker = require('./worker');
const worker = initWorker(Worker);

export function walletFromMnemonic (mnemonic: string, path: string): Promise<WalletType> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'walletFromMnemonic',
      mnemonic,
      path
    })
    .then(({ address, privateKey }: WalletType) => {
      return {
        address,
        privateKey: Buffer.from(privateKey || [])
      };
    });
  });
}

export function walletFromPhrase (phrase: string): Promise<WalletType> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'walletFromPhrase',
      phrase
    })
    .then(({ address, privateKey }: WalletType) => {
      return {
        address,
        privateKey: Buffer.from(privateKey || [])
      };
    });
  });
}

export function walletFromPrivateKey (privateKey: string): Promise<WalletType> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'walletFromPrivateKey',
      privateKey
    })
    .then(({ address, privateKey }: WalletType) => {
      return {
        address,
        privateKey: Buffer.from(privateKey || [])
      };
    });
  });
}

export function walletFromKeyObject (keyObject: ?PrivateKeyType, password: string): Promise<WalletType> {
  console.log('walletFromKeyObject', keyObject, password);

  if (!keyObject) {
    return Promise.resolve({});
  }

  const address: string = formatAddress(keyObject.address);

  return decryptPrivateKey((keyObject: PrivateKeyType), password).then((privateKey: Buffer) => {
    return {
      address,
      privateKey
    };
  });
}
