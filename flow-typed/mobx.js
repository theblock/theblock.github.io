// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'mobx' {
  declare module.exports: {
    action: (() => mixed) => void,
    autorun: (() => mixed) => void,
    computed: (() => mixed) => mixed,
    observable: (() => mixed) => void,
    transaction: (() => mixed) => void
  };
}
