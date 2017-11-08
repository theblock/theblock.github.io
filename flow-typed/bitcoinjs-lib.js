// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

type HDNodeType = {
  derive: (index: number) => HDNodeType;
  deriveHardened: (index: number) => HDNodeType;
  derivePath: (path: string) => HDNodeType;

  keyPair: {
    d: {
      toBuffer: () => Buffer
    }
  }
};

type NetworkType = {
};

declare module 'bitcoinjs-lib' {
  declare module.exports: {
    HDNode: {
      fromSeedHex: (seed: Buffer, network: NetworkType) => HDNodeType;
    },
    networks: {
      bitcoin: NetworkType;
    }
  }
}
