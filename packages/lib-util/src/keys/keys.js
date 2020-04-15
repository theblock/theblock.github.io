// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import keythereum from 'keythereum';

import type { PrivateKeyType, UnencrypedKeyType } from '../types';

export async function createKeyObject (_privateKey: ?Buffer, password: string): Promise<PrivateKeyType> {
  console.log('keys:createKeyObject');

  const privateKey: Buffer = Buffer.from(_privateKey || []);

  if (!privateKey.length) {
    return {};
  }

  const iv: Buffer = keythereum.crypto.randomBytes(16);
  const salt: Buffer = keythereum.crypto.randomBytes(32);

  return keythereum.dump(Buffer.from(password), privateKey, salt, iv);
}

export async function decryptPrivateKey (keyObject: PrivateKeyType, password: string): Promise<Buffer> {
  console.log('keys:decryptPrivateKey');

  return keythereum.recover(Buffer.from(password), keyObject);
}

export async function newKeyObject (password: string): Promise<PrivateKeyType> {
  console.log('keys:newKeyObject');

  const { privateKey, iv, salt }: UnencrypedKeyType = keythereum.create();

  return keythereum.dump(Buffer.from(password), privateKey, salt, iv);
}
