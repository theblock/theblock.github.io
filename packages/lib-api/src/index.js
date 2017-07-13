// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

import type { PriceResultType, SignatureType } from '@theblock/lib-services/src/types';
import type { AbiMethodType, DecodedDataType, ProviderInterface, ReceiptResultType, ReceiptOutputType, TxResultType, TxObjectType, TxOutputType } from './types';

import { getTokenPrice } from '@theblock/lib-services/src/cryptocompare';
import { getMethodSignature } from '@theblock/lib-services/src/fourbyte';
import { fromBnToHex, fromDecToBn, fromHexToBn } from '@theblock/lib-util/src/convert';
import { concatHex } from '@theblock/lib-util/src/format';
import { deferPromise } from '@theblock/lib-util/src/promise';
import { HumanStandardToken } from '@theblock/meta-contracts/src/abi';

import Contract from './contract';
import { decodeData } from './contract/data';
import { formatInputAddress, formatInputTx, formatOutputReceipt, formatOutputTx } from './format';
import MiddlewareProvider from './provider/middleware';

const ESTIMATE_GAS_INPUT: BN = fromHexToBn('0xffffff');
const BASE_GAS_LIMIT: BN = fromDecToBn('21001'); // geth returns 21001
const BN125: BN = new BN('125');
const BN100: BN = new BN('100');

export default class Api {
  _chainId: number = 0;
  _providerInterface: ProviderInterface;
  _tokenInterface: Contract;

  constructor (provider: ProviderInterface, withMiddleware?: boolean) {
    this._providerInterface = withMiddleware
      ? new MiddlewareProvider(provider)
      : provider;
    this._tokenInterface = new Contract(HumanStandardToken);
  }

  send = (method: string, params: Array<any>): Promise<any> => {
    return deferPromise(() => {
      return new Promise((resolve, reject) => {
        this._providerInterface.send(method, params, (error: ?Error, result: ?any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    });
  };

  get providerInterface (): ProviderInterface {
    return this._providerInterface;
  }

  get tokenInterface (): Contract {
    return this._tokenInterface;
  }

  async call (tx: TxObjectType): Promise<string> {
    const result: string = await this.send('eth_call', [
      formatInputTx(tx),
      'latest'
    ]);

    return result;
  }

  async estimateGas (tx: TxObjectType): Promise<BN> {
    tx.gasLimit = !tx.gasLimit || tx.gasLimit.isZero()
      ? ESTIMATE_GAS_INPUT
      : tx.gasLimit;

    const result: string = await this.send('eth_estimateGas', [
      formatInputTx(tx)
    ]);

    return fromHexToBn(result);
  }

  async getBlockNumber (): Promise<BN> {
    const result: string = await this.send('eth_blockNumber', []);

    return fromHexToBn(result);
  }

  async getChainId (): Promise<number> {
    if (this._providerInterface.chainId !== 0) {
      return this._providerInterface.chainId;
    } else if (this._chainId !== 0) {
      return this._chainId;
    }

    const chainId: string = await this.send('net_version', []);

    this._chainId = parseInt(chainId, 10);

    return this._chainId;
  }

  async getGasPrice (): Promise<BN> {
    const result: string = await this.send('eth_gasPrice', []);

    return fromHexToBn(result);
  }

  async decodeData (hex: ?string): Promise<DecodedDataType> {
    const { method, name, types }: SignatureType = await getMethodSignature(hex);

    return {
      method,
      name,
      types,
      values: (name && types.length)
        ? decodeData(types, hex, true)
        : []
    };
  }

  async getNetworkBalance (address: string): Promise<BN> {
    const result: string = await this.send('eth_getBalance', [
      formatInputAddress(address),
      'latest'
    ]);

    return fromHexToBn(result);
  }

  async getNonce (address: ?string): Promise<BN> {
    const result: string = await this.send('eth_getTransactionCount', [
      formatInputAddress(address),
      'latest'
    ]);

    return fromHexToBn(result);
  }

  async getReceipt (txHash: string): Promise<?ReceiptOutputType> {
    const result: ReceiptResultType = await this.send('eth_getTransactionReceipt', [
      txHash
    ]);

    return formatOutputReceipt(result);
  }

  getTokenPrice (token: string, currencies: Array<string>): Promise<PriceResultType> {
    return getTokenPrice(token, currencies);
  }

  async getTokenBalance (token: string, address: string): Promise<BN> {
    const from: string = formatInputAddress(address);
    const method: AbiMethodType = this._tokenInterface.findMethod('balanceOf');

    const result: string = await this.send('eth_call', [
      {
        to: formatInputAddress(token),
        data: method.encode([formatInputAddress(from)])
      },
      'latest'
    ]);

    return (method.decode(result)[0]: BN);
  }

  async getTransaction (txHash: string): Promise<?TxOutputType> {
    const result: TxResultType = await this.send('eth_getTransactionByHash', [
      txHash
    ]);

    return formatOutputTx(result);
  }

  async _estimateTxGasValues (tx: TxObjectType): Promise<TxObjectType> {
    const [[gasPrice], [gasLimit, isLimitEstimated]] = await Promise.all([
      (!tx.gasPrice || tx.gasPrice.isZero())
        ? this.getGasPrice().then((gasPrice) => [gasPrice, true])
        : [tx.gasPrice, false],
      (!tx.gasLimit || tx.gasLimit.isZero())
        ? this.estimateGas(tx).then((gasLimit) => [gasLimit, true])
        : [tx.gasLimit, false]
    ]);

    tx.gasPrice = gasPrice;
    tx.gasLimit = isLimitEstimated && gasLimit.gt(BASE_GAS_LIMIT)
      ? gasLimit.mul(BN125).divRound(BN100)
      : gasLimit;

    return tx;
  }

  async sendTokenTransaction (tokenAddress: string, tx: TxObjectType): Promise<string> {
    const method: AbiMethodType = this._tokenInterface.findMethod('transfer');
    const result: string = await this.sendTransaction({
      data: concatHex([
        method.encode([tx.to, fromBnToHex(tx.value)]),
        tx.data
      ]),
      from: tx.from,
      gasLimit: tx.gasLimit,
      gasPrice: tx.gasPrice,
      to: tokenAddress,
      value: new BN(0)
    });

    return result;
  }

  async sendTransaction (_tx: TxObjectType): Promise<string> {
    const tx: TxObjectType = await this._estimateTxGasValues(_tx);
    const result: string = await this.send('eth_sendTransaction', [
      formatInputTx(tx)
    ]);

    return result;
  }

  async sendRawTransaction (rawTx: string): Promise<string> {
    const result: string = await this.send('eth_sendRawTransaction', [
      rawTx
    ]);

    return result;
  }
}
