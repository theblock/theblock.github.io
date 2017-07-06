// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'bip39' {
  declare var exports: {
    mnemonicToSeed: (mnemonic: string) => Buffer;
    validateMnemonic: (mnemonic: string) => boolean;
  }
}
