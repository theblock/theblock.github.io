// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { decodeMethodString } from './signatures';

describe('signatures', () => {
  describe('decodeMethodString', () => {
    it('returns empty with no method', () => {
      expect(decodeMethodString('')).toEqual({
        method: '',
        name: '',
        types: []
      });
    });

    it('decodes a method with no params', () => {
      expect(decodeMethodString('something()')).toEqual({
        method: 'something()',
        name: 'something',
        types: []
      });
    });

    it('decodes a method', () => {
      expect(decodeMethodString('transferFrom(address,address,uint256)')).toEqual({
        method: 'transferFrom(address,address,uint256)',
        name: 'transferFrom',
        types: ['address', 'address', 'uint256']
      });
    });
  });
});
