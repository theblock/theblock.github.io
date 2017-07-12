// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'blockies' {
  declare module.exports: (struct: { scale: number, seed: string, size: number }) => {
    toDataURL: (type: string) => string
  }
}
