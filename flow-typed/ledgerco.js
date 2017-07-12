// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { LedgerEthComms, LedgerEth, U2FCommsType } from '../packages/lib-hradware/src/types'; // eslint-disable-line

declare module 'ledgerco' {
  declare var exports: {
    comm_u2f: U2FCommsType,
    eth: {
      constructor (comms: LedgerEthComms): LedgerEth;
    }
  }
}
