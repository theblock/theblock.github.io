// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { LedgerEthComms, LedgerEth, U2FCommsType } from '../packages/lib-hradware/src/types'; // eslint-disable-line

declare module 'ledgerco' {
  declare class Eth {
    constructor (comms: LedgerEthComms): LedgerEth;
  }

  declare module.exports: {
    comm_u2f: U2FCommsType;
    eth: Eth;
  }
}
