// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

import type { U2FApiResultType } from '../src/types';

declare module 'u2f-api' {
  declare module.exports: {
    getApiVersion: ((version: Error | U2FApiResultType) => void, timeout?: number) => void
  }
}
