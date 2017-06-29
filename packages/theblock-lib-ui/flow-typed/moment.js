// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'moment' {
  declare var exports: (date: Date) => {
    fromNow: () => string;
    locale: (locale: string) => void;
  }
}
