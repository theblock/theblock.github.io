// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'ethereumjs-util' {
  declare var exports: {
    privateToPublic: (privBuf: Buffer | Array<number>) => Array<number>;
    publicToAddress: (pubBuf: Buffer | Array<number>, compressed?: boolean) => Array<number>;
  }
}
