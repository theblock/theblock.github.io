// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { isAddressChecksumValid, isAddressValid, isEnsName, isMnemonicValid } from './validate';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('validate', () => {
  describe('isEnsName', () => {
    it('returns false on empty', () => {
      expect(isEnsName('')).toBe(false);
    });

    it('returns true on valid .eth', () => {
      expect(isEnsName('foo.eth')).toBe(true);
    });

    it('returns true with extra spaces with .eth', () => {
      expect(isEnsName(' foo.eth ')).toBe(true);
    });
  });

  describe('isMnemonicValid', () => {
    const MNE_VALID: string = 'kit destroy choice zebra tribe noodle grunt swift click shuffle chef supply';
    const MNE_INVALID: string = 'evolve feature stay';

    it('returns false on invalid mnemonics', () => {
      expect(isMnemonicValid(MNE_INVALID)).toBe(false);
    });

    it('returns true on valid mnemonics', () => {
      expect(isMnemonicValid(MNE_VALID)).toBe(true);
    });

    it('returns true on extra-whitespaced mnemonics', () => {
      expect(isMnemonicValid(` ${MNE_VALID.split(' ').join('  ')}  `)).toBe(true);
    });
  });

  describe('isAddressChecksumValid', () => {
    it('returns false on invalid address', () => {
      expect(isAddressChecksumValid('0xinvalid')).toBe(false);
    });

    it('returns false on non-checksum address', () => {
      expect(isAddressChecksumValid('0x1234567890abcdeedcba1234567890abcdeedcba')).toBe(false);
    });

    it('returns false when fully lowercase', () => {
      expect(isAddressChecksumValid(ADDRESS.toLowerCase())).toBe(false);
    });

    it('returns false when fully uppercase', () => {
      expect(isAddressChecksumValid(ADDRESS.toUpperCase().replace('0X', '0x'))).toBe(false);
    });

    it('returns true on a checksummed address', () => {
      expect(isAddressChecksumValid(ADDRESS)).toBe(true);
    });
  });

  describe('isAddressValid', () => {
    it('returns true when fully lowercase', () => {
      expect(isAddressValid(ADDRESS.toLowerCase())).toBe(true);
    });

    it('returns true when fully uppercase', () => {
      expect(isAddressValid(ADDRESS.toUpperCase().replace('0X', '0x'))).toBe(true);
    });

    it('returns true when checksummed', () => {
      expect(isAddressValid(ADDRESS)).toBe(true);
    });

    it('returns false when invalid address', () => {
      expect(isAddressValid('0xinvalid')).toBe(false);
    });
  });
});
