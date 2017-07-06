// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import qs from 'query-string';

import { APIKEY } from '@theblock/lib-services/src/etherscan';
import { fromDecToHex } from '@theblock/lib-util/src/convert';

import HttpFetchTransport from '../transport/httpFetch';
import type { JsonRpcResponse, ProviderCallbackType, ProviderInterface, TransportOptionsType } from '../types';

type ModuleType = 'account' | 'proxy';
type ModuleResult = JsonRpcResponse & {
  message?: 'OK' | 'NOTOK',
  result: string
};

type ParamType = {
  expand?: boolean,
  name?: string
};

type MethodType = {
  action?: string,
  section?: ModuleType,
  params: Array<ParamType>,
  format?: (any) => string
};

const METHODS: { [string]: MethodType } = {
  'eth_blockNumber': {
    params: []
  },
  'eth_call': {
    params: [
      { expand: true },
      { name: 'tag' }
    ]
  },
  'eth_estimateGas': {
    params: [
      { expand: true }
    ]
  },
  'eth_gasPrice': {
    params: []
  },
  'eth_getBalance': {
    action: 'balance',
    section: 'account',
    params: [
      { name: 'address' },
      { name: 'tag' }
    ],
    format: fromDecToHex
  },
  'eth_getTransactionByHash': {
    params: [
      { name: 'txhash' }
    ]
  },
  'eth_getTransactionCount': {
    params: [
      { name: 'address' },
      { name: 'tag' }
    ]
  },
  'eth_getTransactionReceipt': {
    params: [
      { name: 'txhash' }
    ]
  },
  'eth_sendRawTransaction': {
    params: [
      { name: 'hex' }
    ]
  }
};

function chainIdToUrl (chainId: number): string {
  switch (chainId) {
    case 1:
      return 'https://api.etherscan.io/api';

    case 3:
      return 'https://ropsten.etherscan.io/api';

    case 4:
      return 'https://rinkeby.etherscan.io/api';

    case 42:
      return 'https://kovan.etherscan.io/api';

    default:
      throw new Error(`ChainId ${chainId} is not supported`);
  }
}

export default class EtherscanProvider extends HttpFetchTransport implements ProviderInterface {
  constructor (chainId: number, options: TransportOptionsType) {
    super(chainId, {
      name: 'Etherscan',
      url: chainIdToUrl(chainId)
    });
  }

  send (method: string, params: Array<any>, callback: ProviderCallbackType): void {
    const mapped: ?MethodType = METHODS[method];

    if (!mapped) {
      return callback(new Error(`Unimplemented method ${method} specified`), null);
    }

    this
      .post(mapped.section || 'proxy', mapped.action || method, this.expandParams(params, mapped.params))
      .then((result: any) => {
        callback(null, mapped.format ? mapped.format(result) : result);
      })
      .catch((error: Error) => {
        callback(error, null);
      });
  }

  expandParams (params: Array<any>, dict: Array<ParamType>): { [any]: any } {
    return dict.reduce((obj: { [any]: any }, param: ParamType, index) => {
      try {
        if (param.expand) {
          Object.keys(params[index]).forEach((key) => {
            obj[key] = params[index][key];
          });
        } else {
          obj[param.name || index] = params[index];
        }
      } catch (error) {
        console.error('param encoding', error);
      }

      return obj;
    }, {});
  }

  post (section: ModuleType, action: string, data?: { [any]: any } = {}): Promise<any> {
    const body = qs.stringify(
      Object.assign({
        action,
        apiKey: APIKEY,
        module: section
      }, data)
    );

    return super
      .fetch(this.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length
        },
        mode: 'cors',
        body
      })
      .then((response: ModuleResult) => {
        if (response.message && response.message !== 'OK') {
          throw new Error(response.result);
        } else if (response.error) {
          throw new Error(response.error.message);
        }

        return response.result;
      });
  }
}
