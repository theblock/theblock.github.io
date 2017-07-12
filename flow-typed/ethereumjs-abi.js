// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'ethereumjs-abi' {
  declare module.exports: {
    methodID: (name: string, types: Array<string>) => string;
    rawDecode: (types: Array<string>, data: Buffer) => Array<any>;
    rawEncode: (types: Array<string>, params: Array<any>) => string;
  }
}
