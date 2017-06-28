// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { LedgerComms, LedgerEth } from '../src/types'; // eslint-disable-line

declare module 'ledgerco' {
  declare var exports: {
    comm_u2f: {
      create_async: () => Promise<LedgerComms>
    },

    eth: {
      constructor (comms: LedgerComms): LedgerEth;
    }
  }
}
