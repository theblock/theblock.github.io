// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'ethereumjs-util' {
  declare var exports: {
    privateToPublic: (Buffer | Array<number>) => Array<number>;
    publicToAddress: (Buffer | Array<number>) => Array<number>;
  }
}
