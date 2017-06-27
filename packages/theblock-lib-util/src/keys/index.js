// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { PrivateKeyType } from '../types';

import { deferPromise, initWorker } from '../promise';

const Worker = require('./worker');
const worker = initWorker(Worker);

export function createKeyObject (privateKey: ?Buffer, password: string): Promise<PrivateKeyType> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'createKeyObject',
      privateKey,
      password
    });
  });
}

export function decryptPrivateKey (keyObject: PrivateKeyType, password: string): Promise<Buffer> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'decryptPrivateKey',
      keyObject,
      password
    });
  });
}

export function newKeyObject (password: string): Promise<PrivateKeyType> {
  return deferPromise(() => {
    return worker.postMessage({
      action: 'newKeyObject',
      password
    });
  });
}
