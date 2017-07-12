// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { JsonRpcResponse, ProviderCallbackType, ProviderInterface } from '../types';

import HttpFetchTransport from '../transport/httpFetch';

export default class JsonRpcProvider extends HttpFetchTransport implements ProviderInterface {
  id: number = 0;

  async send (method: string, params: Array<any>, callback: ProviderCallbackType): Promise<void> {
    try {
      const result: any = await this.post(method, params);

      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }

  async post (method: string, params: Array<any>): Promise<any> {
    const body = JSON.stringify({
      id: this.id++,
      jsonrpc: '2.0',
      method,
      params
    });

    const { error, result }: JsonRpcResponse = await this.fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': body.length
      },
      mode: 'cors',
      body
    });

    if (error) {
      throw new Error(error.message);
    }

    return result;
  }
}
