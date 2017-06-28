// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export type LedgerResultGetAddressType = {
  address: string
};

export type LedgerComms = {
};

export type LedgerEth = {
  getAddress_async (path: string, confirm: boolean, withChain: false): Promise<LedgerResultGetAddressType>;
};

export type U2FApiResultType = {
  js_api_version: string
};
