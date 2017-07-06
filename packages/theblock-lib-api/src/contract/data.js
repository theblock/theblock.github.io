// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import Abi from 'ethereumjs-abi';

import { formatAddress, removeHexPrefix } from '@theblock/lib-util/src/format';

const ZERO_ADDR: string = '0000000000000000000000000000000000000000';

export function decodeData (types: Array<string>, data: ?string): Array<any> {
  const values: Array<any> = Abi.rawDecode(types, Buffer.from(removeHexPrefix(data || '0x'), 'hex'));

  return values.map((value, index) => {
    switch (types[index]) {
      case 'address':
        return formatAddress(`${ZERO_ADDR}${value.toString('hex')}`.slice(-40));

      default:
        return value;
    }
  });
}

export function encodeData (types: Array<string>, params: Array<string>, prefix?: string): string {
  return `0x${removeHexPrefix(prefix || '')}${Buffer.from(Abi.rawEncode(types, params)).toString('hex')}`;
}
