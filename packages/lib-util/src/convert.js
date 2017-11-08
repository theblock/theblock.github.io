// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

import { removeHexPrefix } from './format';
import { hasHexPrefix } from './validate';

const ETH_ZEROS: string = '000000000000000000';

export function fromBnToDec (value?: any): string {
  if (!value) {
    return '0';
  }

  if (BN.isBN(value)) {
    return value.toString(10);
  } else if (Number.isInteger(value)) {
    return new BN(value, 10).toString(10);
  }

  return `${value}`;
}

export function fromBnToHex (value?: any): string {
  if (!value) {
    return '0x0';
  }

  if (BN.isBN(value)) {
    return `0x${value.toString(16)}`;
  } else if (Number.isInteger(value)) {
    return `0x${new BN(value, 10).toString(16)}`;
  }

  return `${value}`;
}

export function fromBytesToHex (bytes: Array<number> | Buffer): string {
  return `0x${Buffer.from(bytes).toString('hex')}`;
}

export function fromDecToBn (value?: any): BN {
  return new BN(value, 10);
}

export function fromDecToHex (value?: any): string {
  return fromBnToHex(fromDecToBn(value));
}

export function fromFloatToBn (value?: string, decimals?: number = 18): BN {
  const [preStr, sufStr = '0'] = `${value || ''}`.split('.');

  const preBn: BN = new BN(`${preStr}${ETH_ZEROS.slice(-1 * decimals)}`, 10);
  const sufBn: BN = new BN(`${sufStr}${ETH_ZEROS}`.substr(0, decimals), 10);

  return preBn.add(sufBn);
}

export function fromHexToBn (value?: ?string): BN {
  return new BN(removeHexPrefix(value || '0'), 16);
}

export function fromHexToDec (value?: any): string {
  return fromHexToBn(value).toString(10);
}

export function fromStrToHex (value?: ?string): string {
  if (!value || !value.length) {
    return '0x';
  }

  if (hasHexPrefix(value)) {
    return value.toLowerCase();
  }

  const hex: string = value.split('').map((chr) => {
    return `0${chr.charCodeAt(0).toString(16)}`.slice(-2);
  }).join('');

  return `0x${hex}`;
}
