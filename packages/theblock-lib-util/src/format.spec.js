// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { formatAddress } from './format';

const ADDRESS = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

describe('format', () => {
  describe('formatAddress', () => {
    it('converts to the checksummed address', () => {
      expect(formatAddress(ADDRESS.toLowerCase())).toBe(ADDRESS);
    });
  });
});
