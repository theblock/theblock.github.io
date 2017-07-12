// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { PrivateKeyType, UnencrypedKeyType } from '../packages/lib-util/src/types'; // eslint-disable-line

declare module 'keythereum' {
  declare module.exports: {
    crypto: {
      randomBytes: (number) => Buffer
    },
    create: () => UnencrypedKeyType,
    dump: (password: Buffer, key: Buffer, salt: Buffer, iv: Buffer) => PrivateKeyType,
    recover: (password: Buffer, keyObject: PrivateKeyType) => Buffer
  };
}
