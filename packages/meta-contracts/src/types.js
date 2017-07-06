// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

type JsonAbiFunctionType = 'constructor' | 'event' | 'function';

type JsonAbiTypeType = string;

type JsonAbiInputType = {
  indexed: boolean,
  name: string,
  type: JsonAbiTypeType
};

type JsonAbiOutputType = {
  name: string,
  type: JsonAbiTypeType
};

export type JsonAbiType = {
  constant: boolean,
  inputs: Array<JsonAbiInputType>,
  name: string,
  outputs: Array<JsonAbiOutputType>,
  payable: boolean,
  type: JsonAbiFunctionType
};

export type ContractLocationType = {
  address: string,
  chainId: number
};

export type ContractType = {
  abi?: Array<JsonAbiType>,
  image?: string,
  key: string,
  name: string,
  url?: string,
  where: Array<ContractLocationType>
};

export type TokenType = ContractType & {
  decimals: number
};
