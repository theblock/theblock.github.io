// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransportOptionsType } from '../types';
import BaseTransport from './base';

export default class HttpFetchTransport extends BaseTransport {
  name: string;
  url: string;

  constructor (chainId: number, options: TransportOptionsType) {
    super(chainId, options);

    this.name = options.name || 'JsonRpc';
    this.url = options.url || '';
  }

  async fetch (url: string, options: Object): Promise<any> {
    const response: Response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${this.url}: Error from service: ${response.status}`);
    }

    return response.json();
  }
}
