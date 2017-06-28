// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'u2f-api' {
  declare var exports: {
    getApiVersion: ((error: Error, version: string) => void, timeout?: number) => void
  }
}
