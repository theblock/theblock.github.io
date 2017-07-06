// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export type LedgerResultGetAddressType = {
  address: string
};

export type LedgerResultSignType = {
  r: string,
  s: string,
  v: string
};

export type LedgerEthComms = {};

export type U2FCommsType = { // eslint-disable-line
  create_async: () => Promise<LedgerEthComms>;
  close_async: () => Promise<boolean>
};

export type LedgerEth = {
  getAddress_async (path: string, confirm: boolean, withChain: false): Promise<LedgerResultGetAddressType>;
  signTransaction_async (path: string, rawTx: string): Promise<LedgerResultSignType>;
  comm: U2FCommsType;
};

export type U2FApiResultType = {
  js_api_version: string
};

type TrezorResultType = {
  success: boolean,
  error: string
};

export type TrezorSignResultType = TrezorResultType & {
  r: string,
  s: string,
  v: number
};

export type TrezorPubKeyResultType = TrezorPubKeyResultType & {
  xpubkey: string,
  path: string,
  serializedPath: string,
  chainCode: string,
  publicKey: string
};
