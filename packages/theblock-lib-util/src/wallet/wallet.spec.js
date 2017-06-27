// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { walletFromPhrase } from './wallet';

const ADDRESSES = [
  '0x00a329c0648769A73afAc7F9381E08FB43dBEA72',
  '0x003b3B729D74a2dc35CEDCaC8E6fBA74BDB62CED'
];

describe('wallet', () => {
  describe('walletFromPhrase', () => {
    it('creates the correct address from an empty string', () => {
      return walletFromPhrase('').then((wallet) => {
        expect(wallet.address).toBe(ADDRESSES[0]);
      });
    });

    it('creates the correct address from a known string', () => {
      return walletFromPhrase('some known string').then((wallet) => {
        expect(wallet.address).toBe(ADDRESSES[1]);
      });
    });
  });
});
