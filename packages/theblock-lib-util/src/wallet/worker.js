// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import registerPromiseWorker from 'promise-worker/register';

import { removeHexPrefix } from '../format';
import { walletFromMnemonic, walletFromPhrase, walletFromPrivateKey } from './wallet';

registerPromiseWorker(function (data) {
  switch (data.action) {
    case 'init':
      return Promise.resolve(true);

    case 'walletFromMnemonic':
      return walletFromMnemonic(data.mnemonic, data.path);

    case 'walletFromPhrase':
      return walletFromPhrase(data.phrase);

    case 'walletFromPrivateKey':
      return walletFromPrivateKey(
        Buffer.from(removeHexPrefix(data.privateKey), 'hex'),
        false
      );

    default:
      return Promise.reject(new Error(`worker:wallet unkown action ${data.action}`));
  }
});
