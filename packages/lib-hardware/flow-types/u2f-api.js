// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { U2FApiResultType } from '../src/types'; // eslint-disable-line

declare module 'u2f-api' {
  declare var exports: {
    getApiVersion: ((version: Error | U2FApiResultType) => void, timeout?: number) => void
  }
}
