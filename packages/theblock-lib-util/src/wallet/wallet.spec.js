// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { walletFromMnemonic, walletFromPhrase } from './wallet';

const MNE_VALID: string = 'kit destroy choice zebra tribe noodle grunt swift click shuffle chef supply';
const MNE_INVALID: string = 'evolve feature stay';
const PATH: string = "m/44'/60'/0'/0";

describe('wallet', () => {
  describe('walletFromMnemonic', () => {
    it('does not allow invalid mnemonics', () => {
      return walletFromMnemonic(MNE_INVALID, PATH).catch((error) => {
        expect(error).not.toBe(null);
      });
    });

    it('generates a valid wallet', () => {
      return walletFromMnemonic(MNE_VALID, PATH).then((wallet) => {
        expect(wallet.address).toBe('0x3B0C01F3841Aaf308efF3087Bb41084f59315D96');
        expect(wallet.privateKey.toString('hex')).toBe('8a3f78e0714ce59231b9a1e15b0d855786d1f2189bc337ef03429a79aaa5a7ea');
      });
    });
  });

  describe('walletFromPhrase', () => {
    it('creates the correct address from an empty string', () => {
      return walletFromPhrase('').then((wallet) => {
        expect(wallet.address).toBe('0x00a329c0648769A73afAc7F9381E08FB43dBEA72');
      });
    });

    it('creates the correct address from a known string', () => {
      return walletFromPhrase('some known string').then((wallet) => {
        expect(wallet.address).toBe('0x003b3B729D74a2dc35CEDCaC8E6fBA74BDB62CED');
      });
    });
  });
});
