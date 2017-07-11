// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

type TriOptionsType = { // eslint-disable-line
  [string]: any
};

declare module 'trianglify' {
  declare var exports: (options: TriOptionsType) => {
    png (): string;
  }
}