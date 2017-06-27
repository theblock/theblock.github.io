// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export type PrivateKeyType = {
  address?: string,
  name?: string,
  meta?: Object
};

export type StorageValueType = {
  [string]: any
};

export type TransactionType = {
  chainId: number,
  nonce: string | Buffer,
  to: ?string | Buffer,
  data: ?string | Buffer,
  gasLimit: ?string | Buffer,
  gasPrice: ?string | Buffer,
  value: ?string | Buffer,
  r?: string | Buffer,
  s?: string | Buffer,
  v?: string | Buffer
};

export type UnencrypedKeyType = {
  privateKey: Buffer,
  iv: Buffer,
  salt: Buffer
};

export type WalletType = {
  address?: string,
  privateKey?: ?Buffer
};

export type StorageNameType = 'accounts' | 'accountDefault' | 'chainDefault' | 'currencyDefault' | 'i18nDefault';
