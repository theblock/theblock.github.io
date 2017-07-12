// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'moment' {
  declare module.exports: (date: Date) => {
    fromNow: () => string
  }
}
