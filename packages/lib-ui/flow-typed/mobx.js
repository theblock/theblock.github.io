// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'mobx' {
  declare var exports: {
    action: (() => void) => void,
    autorun: (() => void) => void,
    computed: (() => mixed) => mixed,
    observable: (() => void) => void,
    transaction: (() => void) => void
  };
}
