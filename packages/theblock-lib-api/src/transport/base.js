// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransportOptionsType } from '../types';

export default class BaseTransport {
  _chainId: number = 0;

  constructor (chainId: number, options: TransportOptionsType) {
    this._chainId = chainId;
  }

  get chainId (): number {
    return this._chainId;
  }
}
