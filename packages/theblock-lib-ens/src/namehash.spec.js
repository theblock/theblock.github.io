// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { createNameHash } from './namehash';

// tests via https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md
const HASH_EMPTY: string = '0x0000000000000000000000000000000000000000000000000000000000000000';
const HASH_ETH: string = '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae';
const HASH_FOO: string = '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f';

describe('namehash', () => {
  describe('createNameHash', () => {
    it('creates 0x00...00 from empty name', () => {
      expect(createNameHash('')).toBe(HASH_EMPTY);
    });

    it('creates correct value to eth tld', () => {
      expect(createNameHash('eth')).toBe(HASH_ETH);
    });

    it('creates correct value for foo.eth', () => {
      expect(createNameHash('foo.eth')).toBe(HASH_FOO);
    });
  });
});
