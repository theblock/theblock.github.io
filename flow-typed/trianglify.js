// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

type TriOptionsType = {
  [string]: any
};

declare module 'trianglify' {
  declare module.exports: (options: TriOptionsType) => {
    png (): string;
  }
}
