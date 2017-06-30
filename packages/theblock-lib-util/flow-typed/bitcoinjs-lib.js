// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

type HDNodeType = { // eslint-disable-line
  derive: (index: number) => HDNodeType;
  deriveHardened: (index: number) => HDNodeType;
  derivePath: (path: string) => HDNodeType;
};

type NetworkType = { // eslint-disable-line
};

declare module 'bitcoinjs-lib' {
  declare var exports: {
    HDNode: {
      fromSeedHex: (seed: buffer, network: NetworkType) => HDNodeType;
    },
    networks: {
      bitcoin: NetworkType;
    }
  }
}
