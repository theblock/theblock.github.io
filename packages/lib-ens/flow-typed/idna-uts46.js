// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

type IdnaOptionsType = { // eslint-disable-line
  transitional: boolean,
  useStd3ASCII: boolean,
  verifyDnsLength: boolean
};

declare module 'idna-uts46' {
  declare var exports: {
    toUnicode: (name: string, options: IdnaOptionsType) => string;
  }
}
