// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { TrezorPubKeyResultType, TrezorSignResultType } from '../src/types'; // eslint-disable-line

declare module 'trezor-connect' {
  declare var exports: {
    signEthereumTx: (path: string, nonce: string, gasPrice: string, gasLimit: string, to: string, value: string, data: string, chainId: number, (result: TrezorSignResultType) => void) => void;
    getXPubKey: (path: string, (result: TrezorPubKeyResultType) => void) => void;
  };
}
