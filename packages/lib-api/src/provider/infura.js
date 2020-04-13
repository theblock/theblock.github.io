// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TransportOptionsType } from '../types';

import { APIKEY } from '@theblock/lib-services/src/infura';

import JsonRpcProvider from './jsonrpc';

function chainIdToUrl (chainId: number): string {
  switch (chainId) {
    case 1:
      return `https://mainnet.infura.io/v3/${APIKEY}`;

    case 3:
      return `https://ropsten.infura.io/v3/${APIKEY}`;

    case 4:
      return `https://rinkeby.infura.io/v3/${APIKEY}`;

    case 42:
      return `https://kovan.infura.io/v3/${APIKEY}`;

    default:
      throw new Error(`ChainId ${chainId} is not supported`);
  }
}

export default class InfuraProvider extends JsonRpcProvider {
  constructor (chainId: number, options: TransportOptionsType) {
    super(chainId, {
      name: 'Infura',
      url: chainIdToUrl(chainId)
    });
  }
}
