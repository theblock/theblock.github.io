// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import registerPromiseWorker from 'promise-worker/register';

import { signTransaction } from './transaction';

registerPromiseWorker(function (data) {
  switch (data.action) {
    case 'init':
      return Promise.resolve(true);

    case 'signTransaction':
      return signTransaction(data.transaction, data.privateKey);

    default:
      return Promise.reject(new Error(`worker:transaction unkown action ${data.action}`));
  }
});
