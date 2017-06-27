// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'i18next' {
  declare var exports: {
    init: ({ lng?: string, fallbackLng: string, resources: Object }) => Object;
    t: (key: string, values?: { [string]: any }) => string;
  }
}
