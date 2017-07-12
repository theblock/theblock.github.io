// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'lz-string' {
  declare module.exports: {
    compressToUTF16: (string) => string;
    decompressFromUTF16: (string) => string;
  }
}
