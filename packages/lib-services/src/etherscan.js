// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';
import qs from 'query-string';

import type { TransactionResultType } from './types';

import { formatAddress } from '@theblock/lib-util/src/format';

type TxListItemType = {
  blockNumber: string,
  confirmations: string,
  from: string,
  gas: string,
  gasPrice: string,
  gasUsed: string,
  hash: string,
  input: string,
  timeStamp: string,
  to: string,
  value: string
};

type TxListResponseType = {
  message: string,
  result: Array<TxListItemType>,
  status: string
};

type EtherscanOptionsType = {
  module: string,
  action: string,
  [string]: any
};

const GET_HEADERS = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Accept': 'application/json'
  }
};
const APIKEY: string = '279BSAWA2EAHS938FAIH4X7FEWW4NDE7ZE';

export {
  APIKEY
};

export default class Etherscan {
  apiUrl: string = '';
  linkUrl: string = '';

  constructor (linkPrefix: string, apiPrefix?: string) {
    this.apiUrl = `https://${apiPrefix || linkPrefix}.etherscan.io/`;
    this.linkUrl = `https://${linkPrefix}${linkPrefix ? '.' : ''}etherscan.io/`;
  }

  getApiUrl (options: EtherscanOptionsType): string {
    return `${this.apiUrl}api?apiKey=${APIKEY}&${qs.stringify(options)}`;
  }

  async getTransactions (address: string): Promise<Array<TransactionResultType>> {
    const url: string = this.getApiUrl({
      module: 'account',
      action: 'txlist',
      address,
      offset: 25,
      page: 1, // pages start at 1
      sort: 'desc'
    });

    const response: Response = await fetch(url, GET_HEADERS);

    try {
      if (!response.ok) {
        throw new Error(response.status);
      }

      const { message, result }: TxListResponseType = await response.json();

      if (message !== 'OK') {
        throw new Error(message);
      }

      return result.map(({ blockNumber, confirmations, from, gas, gasPrice, gasUsed, hash, input, timeStamp, to, value }: TxListItemType) => {
        return ({
          blockNumber: new BN(blockNumber),
          confirmations: new BN(confirmations),
          data: input,
          from: formatAddress(from),
          gasLimit: new BN(gas),
          gasPrice: new BN(gasPrice),
          gasUsed: new BN(gasUsed),
          hash,
          timeStamp: new Date(parseInt(timeStamp, 10) * 1000),
          to: formatAddress(to),
          value: new BN(value)
        }: TransactionResultType);
      });
    } catch (error) {
      console.error(url, error);

      return [];
    }
  }

  linkAddress (address: string): string {
    return `${this.linkUrl}address/${address}`;
  }

  linkBlockNumber (blockNumber: string): string {
    return `${this.linkUrl}block/${blockNumber}`;
  }

  linkTransaction (txHash: string): string {
    return `${this.linkUrl}tx/${txHash}`;
  }
}
