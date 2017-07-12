// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'promise-worker' {
  declare class PromiseWorker {
    constructor (worker: ServiceWorker): PromiseWorker;

    postMessage: (data: { action: string, [string]: any }) => Promise<any>;
  }

  declare module.exports: typeof PromiseWorker;
}
