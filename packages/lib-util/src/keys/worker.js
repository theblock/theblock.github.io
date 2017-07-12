// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import registerPromiseWorker from 'promise-worker/register';

import { createKeyObject, decryptPrivateKey, newKeyObject } from './keys';

registerPromiseWorker(async function (data) {
  switch (data.action) {
    case 'init':
      return true;

    case 'createKeyObject':
      return createKeyObject(data.privateKey, data.password);

    case 'decryptPrivateKey':
      return decryptPrivateKey(data.keyObject, data.password);

    case 'newKeyObject':
      return newKeyObject(data.password);

    default:
      throw new Error(`worker:keys unkown action ${data.action}`);
  }
});
