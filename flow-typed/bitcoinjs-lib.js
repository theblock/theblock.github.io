// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

type HDNodeType = { // eslint-disable-line
  derive: (index: number) => HDNodeType;
  deriveHardened: (index: number) => HDNodeType;
  derivePath: (path: string) => HDNodeType;

  keyPair: {
    d: {
      toBuffer: () => Buffer
    }
  }
};

type NetworkType = { // eslint-disable-line
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
