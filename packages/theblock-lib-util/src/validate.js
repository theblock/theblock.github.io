// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import bip39 from 'bip39';
import createKeccakHash from 'keccak';

import { trimPhrase } from './format';

export function isAddressChecksumValid (_address: string): boolean {
  const address: string = _address.replace('0x', '');
  const hash: string = createKeccakHash('keccak256').update(address.toLowerCase()).digest().toString('hex');

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
  if (address && address.length === 42) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      return true;
    }

    return isAddressChecksumValid(address);
  }

  return false;
}

export function isEnsName (address: ?string): boolean {
  return /\.eth$/.test((address || '').trim());
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
