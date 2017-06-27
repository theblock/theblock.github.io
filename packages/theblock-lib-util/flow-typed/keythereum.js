// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { PrivateKeyType, UnencrypedKeyType } from '../src/types'; // eslint-disable-line

declare module 'keythereum' {
  declare var exports: {
    crypto: {
      randomBytes: (number) => Buffer
    },
    create: () => UnencrypedKeyType,
    dump: (password: Buffer, key: Buffer, salt: Buffer, iv: Buffer) => PrivateKeyType,
    recover: (password: Buffer, keyObject: PrivateKeyType) => Buffer
  };
}
