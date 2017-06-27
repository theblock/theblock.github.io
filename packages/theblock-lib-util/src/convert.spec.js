// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

import { fromBnToDec, fromBnToHex } from './convert';

describe('convert', () => {
  describe('fromBnToDec', () => {
    it('converts empty to 0', () => {
      expect(fromBnToDec()).toBe('0');
    });

    it('converts a BN to decimal', () => {
      expect(fromBnToDec(new BN(12345))).toBe('12345');
    });

    it('converts numbers to decimal', () => {
      expect(fromBnToDec(12345)).toBe('12345');
    });

    it('resturns strings as-is', () => {
      expect(fromBnToDec('12345')).toBe('12345');
    });
  });

  describe('fromBnToHex', () => {
    it('converts empty to 0x0', () => {
      expect(fromBnToHex()).toBe('0x0');
    });

    it('converts a BN to hex', () => {
      expect(fromBnToHex(new BN(12345))).toBe('0x3039');
    });

    it('converts numbers to hex', () => {
      expect(fromBnToHex(12345)).toBe('0x3039');
    });

    it('resturns strings as-is', () => {
      expect(fromBnToHex('0x12345')).toBe('0x12345');
    });
  });
});
