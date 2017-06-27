// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export type ContractLocationType = {
  address: string,
  chainId: number
};

export type ContractType = {
  image?: string,
  key: string,
  name: string,
  url?: string,
  where: Array<ContractLocationType>
};

export type TokenType = ContractType & {
  decimals: number
};
