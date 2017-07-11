// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import bip39 from 'bip39';

import { trimPhrase } from './format';
import { createSha3Raw } from './sha3';

export function isAddressChecksumValid (_address: string): boolean {
  const address: string = _address.replace('0x', '');
  const hash: string = createSha3Raw(address.toLowerCase());

  for (let index: number = 0; index < 40; index++) {
    const char: string = address[index];
    const hashval: number = parseInt(hash[index], 16);

    if ((hashval > 7 && char !== char.toUpperCase()) || (hashval <= 7 && char !== char.toLowerCase())) {
      return false;
    }
  }

  return true;
}

export function isAddressValid (address: ?string): boolean {
  if (!address || address.length !== 42 || !isHexValid(address)) {
    return false;
  }

  if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    return true;
  }

  return isAddressChecksumValid(address);
}

export function isEnsName (_address: ?string): boolean {
  const address = (_address || '').trim();
  const parts = address.split('.');

  return /\.eth$/.test(address) &&
    parts.length >= 2 &&
    parts[parts.length - 2].length >= 7;
}

export function isHexValid (hex: ?string): boolean {
  if (hex && hex.substr(0, 2) === '0x' && hex.length % 2 === 0) {
    return hex === '0x' || /^0x[0-9a-fA-F]+$/.test(hex);
  }

  return false;
}

export function isMnemonicValid (mnemonic: string): boolean {
  return bip39.validateMnemonic(trimPhrase(mnemonic));
}
