// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

type IdnaOptionsType = {
  transitional: boolean,
  useStd3ASCII: boolean,
  verifyDnsLength: boolean
};

declare module 'idna-uts46' {
  declare module.exports: {
    toUnicode: (name: string, options: IdnaOptionsType) => string;
  }
}
