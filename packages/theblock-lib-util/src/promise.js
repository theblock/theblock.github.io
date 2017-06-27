// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import PromiseWorker from 'promise-worker';

const DEFER_TIMEOUT: number = 0;

export function deferPromise (factory: () => Promise<any>, timeout?: number = DEFER_TIMEOUT): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      factory()
        .then(resolve)
        .catch(reject);
    }, timeout);
  });
}

export function initWorker (Worker: any) {
  const worker: ServiceWorker = new Worker();
  const promiseWorker = new PromiseWorker(worker);

  promiseWorker.postMessage({ action: 'init' });

  return promiseWorker;
}
