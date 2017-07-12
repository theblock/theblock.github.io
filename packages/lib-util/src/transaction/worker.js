// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import registerPromiseWorker from 'promise-worker/register';

import { signTransaction } from './transaction';

registerPromiseWorker(async function (data) {
  switch (data.action) {
    case 'init':
      return true;

    case 'signTransaction':
      return signTransaction(data.transaction, data.privateKey);

    default:
      throw new Error(`worker:transaction unkown action ${data.action}`);
  }
});
