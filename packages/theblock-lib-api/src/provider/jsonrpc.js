// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { JsonRpcResponse, ProviderCallbackType, ProviderInterface } from '../types';

import HttpFetchTransport from '../transport/httpFetch';

export default class JsonRpcProvider extends HttpFetchTransport implements ProviderInterface {
  id: number = 0;

  send (method: string, params: Array<any>, callback: ProviderCallbackType): void {
    this
      .post(method, params)
      .then((result: any) => {
        callback(null, result);
      })
      .catch((error: Error) => {
        callback(error, null);
      });
  }

  post (method: string, params: Array<any>): Promise<any> {
    const body = JSON.stringify({
      id: this.id++,
      jsonrpc: '2.0',
      method,
      params
    });

    return this
      .fetch(this.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Content-Length': body.length
        },
        mode: 'cors',
        body
      })
      .then((response: JsonRpcResponse) => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        return response.result;
      });
  }
}
