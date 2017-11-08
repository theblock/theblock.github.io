// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

import type { LedgerEthComms, LedgerEth, U2FCommsType } from '../packages/lib-hradware/src/types';

declare module 'ledgerco' {
  declare class Eth {
    constructor (comms: LedgerEthComms): LedgerEth;
  }

  declare module.exports: {
    comm_u2f: U2FCommsType;
    eth: typeof Eth;
  }
}
