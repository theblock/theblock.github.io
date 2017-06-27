// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransportOptionsType } from '../types';

import JsonRpcProvider from './jsonrpc';

function chainIdToUrl (chainId: number): string {
  switch (chainId) {
    case 61:
      return 'https://mewapi.epool.io';

    default:
      throw new Error(`ChainId ${chainId} is not supported`);
  }
}

export default class EpoolProvider extends JsonRpcProvider {
  constructor (chainId: number, options: TransportOptionsType) {
    super(chainId, {
      name: 'epool.io',
      url: chainIdToUrl(chainId)
    });
  }
}
