// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

import type { JsonAbiType } from '@theblock/meta-contracts/src/types';
import type { SignatureType } from '@theblock/lib-services/src/types';

export type DecodedDataType = SignatureType & {
  values: Array<any>
};

export type AbiMethodType = {
  abi: JsonAbiType,
  signature: string,
  decode: (data: string) => Array<any>,
  encode: (params: Array<any>) => string
};

export type JsonRpcError = {
  code: number,
  data: string,
  message: string
};

export type JsonRpcResponse = {
  id: number,
  error: JsonRpcError,
  jsonrpc: string,
  result: string
};

// {"blockHash":"0xf64a12502afc36db3d29931a2148e5d6ddaa883a2a3c968ca2fb293fa9258c68","blockNumber":"0x70839","contractAddress":null,"cumulativeGasUsed":"0x75d5","gasUsed":"0x75d5","logs":[{"address":"0x03fca6077d38dd99d0ce14ba32078bd2cda72d74","blockHash":"0xf64a12502afc36db3d29931a2148e5d6ddaa883a2a3c968ca2fb293fa9258c68","blockNumber":"0x70839","data":"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a4861636b65726e65777300000000000000000000000000000000000000000000","logIndex":"0x0","topics":["0x24bcf19562365f6510754002f8d7b818d275886315d29c7aa04785570b97a363"],"transactionHash":"0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1","transactionIndex":"0x0","transactionLogIndex":"0x0","type":"mined"}],"logsBloom":"0x00000000000000000000000000000400000000020000000000000000400000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","root":"0xc659845f1ac4e899ff1b0666dbac5deeda33a4a5d85da71f617f352824146e40","transactionHash":"0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1","transactionIndex":"0x0"}
export type ReceiptResultType = {
  blockHash: string,
  blockNumber: string,
  contractAddress: string,
  cumulativeGasUsed: string,
  gasUsed: string
};

export type ReceiptOutputType = {
  blockNumber: BN,
  contractAddress: string,
  gasUsed: BN
};

export type TransportOptionsType = {
  name?: string,
  url?: string
};

// https://github.com/ethereum/interfaces/issues/16#issuecomment-298910753
export interface ProviderInterface {
  +chainId: number;
  +name: string;

  constructor (chainId: number, options: TransportOptionsType): ProviderInterface;

  send (methodName: string, params: Array<any>, callback: (error: ?Error, result: ?any) => void): Promise<void>;
}
export type ProviderCallbackType = (error: ?Error, result: ?any) => void;

export type MiddleWareHandlerType = (provider: ProviderInterface, method: string, params: Array<any>, callback: ProviderCallbackType) => void;

export type MiddlewareConfigType = {
  [string]: MiddleWareHandlerType
};

export type TxObjectType = {
  data?: ?string,
  from?: ?string,
  to?: ?string,
  gasLimit?: ?BN,
  gasPrice?: ?BN,
  value?: ?BN
};

export type TxInputType = {
  data: string,
  from?: ?string,
  to?: ?string,
  gas: string,
  gasPrice: string,
  value: string
};

export type TxResultType = {
  blockHash: string,
  blockNumber: string,
  condition: { [string]: any },
  creates: string,
  data: string,
  gas: string,
  gasPrice: string,
  from: string,
  nonce: string,
  to: string,
  value: string,
};

export type TxOutputType = {
  // blockHash: string,
  blockNumber: BN,
  // condition?: { [string]: any },
  creates: string,
  // from: string,
  // gasLimit: BN,
  // gasPrice: BN,
  // hash: string,
  // input: string,
  // nonce: BN,
  // publicKey: string,
  // to: string,
  // value: BN
  // {"blockHash":"0xf64a12502afc36db3d29931a2148e5d6ddaa883a2a3c968ca2fb293fa9258c68","blockNumber":"0x70839","condition":null,"creates":null,"from":"0xc80fb22930b303b55df9b89901889126400add38","gas":"0x30d40","gasPrice":"0xba43b7400","hash":"0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1","input":"0xfc36e15b0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a4861636b65726e65777300000000000000000000000000000000000000000000","networkId":null,"nonce":"0xa7","publicKey":"0xd6fa924758c881a8f5e97c34780cad4f0f0fc27def3a46b3363bc35d6c0414b2707be2b7ebfabf10d6051239614cbed99cff8863cca610c8245801583db1fb39","r":"0xe7ccdba116aa95ae8d9bdd02f619a0cdfc1f60c5740b3899865822a80cd70218","raw":"0xf8cb81a7850ba43b740083030d409403fca6077d38dd99d0ce14ba32078bd2cda72d7480b864fc36e15b0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a4861636b65726e657773000000000000000000000000000000000000000000001ca0e7ccdba116aa95ae8d9bdd02f619a0cdfc1f60c5740b3899865822a80cd70218a0f200df1921ea988d16280a0873b69cb782a54e8a596d15e700710c820c8d2a9e","s":"0xf200df1921ea988d16280a0873b69cb782a54e8a596d15e700710c820c8d2a9e","standardV":"0x1","to":"0x03fca6077d38dd99d0ce14ba32078bd2cda72d74","transactionIndex":"0x0","v":"0x1c","value":"0x0"}
};
