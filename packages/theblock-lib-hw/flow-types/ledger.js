// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'ledgerco' {
  declare var exports: {
    comm_u2f: {
      create_async: () => Promise
    },

    class eth {
      constructor (tx: TransactionType): LedgerEth;
    }
  }
}
