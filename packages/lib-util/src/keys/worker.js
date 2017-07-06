// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import registerPromiseWorker from 'promise-worker/register';

import { createKeyObject, decryptPrivateKey, newKeyObject } from './keys';

registerPromiseWorker(function (data) {
  switch (data.action) {
    case 'init':
      return Promise.resolve(true);

    case 'createKeyObject':
      return createKeyObject(data.privateKey, data.password);

    case 'decryptPrivateKey':
      return decryptPrivateKey(data.keyObject, data.password);

    case 'newKeyObject':
      return newKeyObject(data.password);

    default:
      return Promise.reject(new Error(`worker:keys unkown action ${data.action}`));
  }
});
