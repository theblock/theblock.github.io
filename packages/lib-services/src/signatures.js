// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { SignatureType } from './types';

export function decodeMethodString (method?: string): SignatureType {
  if (!method || !method.length) {
    return {
      method,
      name: '',
      types: []
    };
  }

  const indexTypes: number = method.indexOf('(');
  const name: string = method.slice(0, indexTypes);
  const typesString: string = method.slice(indexTypes + 1, method.length - 1);
  const types: Array<string> = typesString
    ? typesString.split(',')
    : [];

  return {
    method,
    name,
    types
  };
}

const defaultSignatures: { [string]: SignatureType } = {
  '0x': decodeMethodString(''),
  '0x70a08231': decodeMethodString('balanceOf(address)'),
  '0xa9059cbb': decodeMethodString('transfer(address,uint256)'),
  '0x23b872dd': decodeMethodString('transferFrom(address,address,uint256)'),
  '0x095ea7b3': decodeMethodString('approve(address,uint256)'),
  '0xdd62ed3e': decodeMethodString('allowance(address,address)'),
  '0x13af4035': decodeMethodString('setOwner(address)')
};

export {
  defaultSignatures
};
