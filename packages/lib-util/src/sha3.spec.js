// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { createSha3 } from './sha3';

describe('sha3', () => {
  describe('createSha3', () => {
    it('creates a correct sha3 value', () => {
      expect(createSha3('testing 123')).toBe('0xf2f7b8d2fe3fd87658f9e920d8d9f7940f54d3a135890b4a71da6319edeeafc2');
    });
  });
});
