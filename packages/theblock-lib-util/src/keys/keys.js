// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import keythereum from 'keythereum';

import type { PrivateKeyType, UnencrypedKeyType } from '../types';

export function createKeyObject (_privateKey: ?Buffer, password: string): Promise<PrivateKeyType> {
  const privateKey: Buffer = Buffer.from(_privateKey || []);

  return new Promise((resolve, reject) => {
    if (!privateKey.length) {
      return resolve({});
    }

    try {
      const iv: Buffer = keythereum.crypto.randomBytes(16);
      const salt: Buffer = keythereum.crypto.randomBytes(32);
      const keyObject: PrivateKeyType = keythereum.dump(Buffer.from(password), privateKey, salt, iv);

      resolve(keyObject);
    } catch (error) {
      reject(error);
    }
  });
}

export function decryptPrivateKey (keyObject: PrivateKeyType, password: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const privateKey: Buffer = keythereum.recover(Buffer.from(password), keyObject);

      resolve(privateKey);
    } catch (error) {
      reject(error);
    }
  });
}

export function newKeyObject (password: string): Promise<PrivateKeyType> {
  return new Promise((resolve, reject) => {
    try {
      const { privateKey, iv, salt }: UnencrypedKeyType = keythereum.create();
      const keyObject: PrivateKeyType = keythereum.dump(Buffer.from(password), privateKey, salt, iv);

      resolve(keyObject);
    } catch (error) {
      reject(error);
    }
  });
}
