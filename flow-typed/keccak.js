// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

type DigestType = 'hex';
type KeccakType = 'keccak256';

declare module 'keccak' {
  declare module.exports: (type: KeccakType) => {
    update: (value: Buffer | string) => {
      digest: () => Buffer;
    }
  };
}
