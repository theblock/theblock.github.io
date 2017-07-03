// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { NULL_ADDRESS } from './constants';
import { concatHex, formatAddress } from './format';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('format', () => {
  describe('concatHex', () => {
    it('concats removing extra 0x', () => {
      expect(concatHex(['0x12', '0x34'])).toBe('0x1234');
    });

    it('concats in absense of 0x', () => {
      expect(concatHex(['12', '34'])).toBe('0x1234');
    });

    it('concats wih null values present', () => {
      expect(concatHex(['0x12', null, '0x34'])).toBe('0x1234');
    });
  });

  describe('formatAddress', () => {
    it('resturns 0x00..00 for no address', () => {
      expect(formatAddress()).toBe(NULL_ADDRESS);
    });

    it('converts to the checksummed address', () => {
      expect(formatAddress(ADDRESS.toLowerCase())).toBe(ADDRESS);
    });
  });
});
