// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

import type { SignatureType } from '@theblock/lib-services/src/types';
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

  call (tx: TxObjectType): Promise<string> {
    return this
      .send('eth_call', [
        formatInputTx(tx),
        'latest'
      ])
      .then((result: string) => result);
  }

  estimateGas (tx: TxObjectType): Promise<BN> {
    tx.gasLimit = !tx.gasLimit || tx.gasLimit.isZero()
      ? ESTIMATE_GAS_INPUT
      : tx.gasLimit;

    return this
      .send('eth_estimateGas', [
        formatInputTx(tx)
      ])
      .then((result: string) => fromHexToBn(result));
  }

  getBlockNumber (): Promise<BN> {
    return this
      .send('eth_blockNumber', [])
      .then((result: string) => fromHexToBn(result));
  }

  getChainId (): Promise<number> {
    if (this._providerInterface.chainId !== 0) {
      return Promise.resolve(this._providerInterface.chainId);
    } else if (this._chainId !== 0) {
      return Promise.resolve(this._chainId);
    }

    return this
      .send('net_version', [])
      .then((chainId: string) => {
        this._chainId = parseInt(chainId, 10);

        return this._chainId;
      });
  }

  getGasPrice (): Promise<BN> {
    return this
      .send('eth_gasPrice', [])
      .then((result: string) => fromHexToBn(result));
  }

  decodeData (hex: ?string): Promise<DecodedDataType> {
    return getMethodSignature(hex)
      .then(({ method, name, types }: SignatureType) => {
        return {
          method,
          name,
          types,
          values: (name && types.length)
            ? decodeData(types, hex.substr(10))
            : []
        };
      });
  }

  getNetworkBalance (address: string): Promise<BN> {
    return this
      .send('eth_getBalance', [
        formatInputAddress(address),
        'latest'
      ])
      .then((result: string) => fromHexToBn(result));
  }

  getNonce (address: ?string): Promise<BN> {
    return this
      .send('eth_getTransactionCount', [
        formatInputAddress(address),
        'latest'
      ])
      .then((result: string) => fromHexToBn(result));
  }

  getReceipt (txHash: string): Promise<?ReceiptOutputType> {
    return this
      .send('eth_getTransactionReceipt', [
        txHash
      ])
      .then((result: ReceiptResultType) => formatOutputReceipt(result));
  }

  getTokenPrice (token: string, currencies: Array<string>): Promise<BN> {
    return getTokenPrice(token, currencies);
  }

  getTokenBalance (token: string, address: string): Promise<BN> {
    try {
      const from: string = formatInputAddress(address);
      const method: AbiMethodType = this._tokenInterface.findMethod('balanceOf');

      return this
        .send('eth_call', [
          {
            to: formatInputAddress(token),
            data: method.encode([formatInputAddress(from)])
          },
          'latest'
        ])
        .then((result: string) => (method.decode(result)[0]: BN));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getTransaction (txHash: string): Promise<?TxOutputType> {
    return this
      .send('eth_getTransactionByHash', [
        txHash
      ])
      .then((result: TxResultType) => formatOutputTx(result));
  }

  _estimateTxGasValues (tx: TxObjectType): Promise<TxObjectType> {
    const _getGasPrice = () => {
      return (!tx.gasPrice || tx.gasPrice.isZero())
        ? this.getGasPrice().then((gasPrice) => [gasPrice, true])
        : Promise.resolve([tx.gasPrice, false]);
    };

    const _getGasLimit = () => {
      return (!tx.gasLimit || tx.gasLimit.isZero())
        ? this.estimateGas(tx).then((gasLimit) => [gasLimit, true])
        : Promise.resolve([tx.gasLimit, false]);
    };

    return Promise
      .all([
        _getGasPrice(),
        _getGasLimit()
      ])
      .then(([[gasPrice], [gasLimit, isLimitEstimated]]) => {
        tx.gasPrice = gasPrice;
        tx.gasLimit = isLimitEstimated && gasLimit.gt(BASE_GAS_LIMIT)
          ? gasLimit.mul(BN125).divRound(BN100)
          : gasLimit;

        return tx;
      });
  }

  sendTokenTransaction (tokenAddress: string, tx: TxObjectType): Promise<string> {
    try {
      const method: AbiMethodType = this._tokenInterface.findMethod('transfer');

      return this.sendTransaction({
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
    } catch (error) {
      return Promise.reject(error);
    }
  }

  sendTransaction (tx: TxObjectType): Promise<string> {
    return this
      ._estimateTxGasValues(tx)
      .then((tx: TxObjectType) => {
        return this.send('eth_sendTransaction', [
          formatInputTx(tx)
        ]);
      })
      .then((result: string) => result);
  }

  sendRawTransaction (rawTx: string): Promise<string> {
    return this
      .send('eth_sendRawTransaction', [
        rawTx
      ])
      .then((result: string) => result);
  }
}
