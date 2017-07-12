// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

type DigestType = 'hex'; // eslint-disable-line
type KeccakType = 'keccak256'; // eslint-disable-line

declare module 'keccak' {
  declare module.exports: (type: KeccakType) => {
    update: (value: Buffer | string) => {
      digest: () => Buffer;
    }
  };
}
