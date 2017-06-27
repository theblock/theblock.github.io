// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import lz from 'lz-string';

import type { StorageValueType, StorageNameType } from './types';

const PREFIX = `theBlock`;

export function getStorage (suffix: StorageNameType): StorageValueType {
  try {
    const lzjson: ?string = localStorage.getItem(`${PREFIX}:${suffix}`);

    if (!lzjson || !lzjson.length) {
      return {};
    }

    const json: string = lz.decompressFromUTF16(lzjson);
    const item: StorageValueType = JSON.parse(json) || {};

    return item;
  } catch (error) {
    console.error('getStorage', error);
  }

  return {};
}

export function setStorage (suffix: StorageNameType, item: StorageValueType): void {
  try {
    const json: string = JSON.stringify(item || {});
    const lzjson: string = lz.compressToUTF16(json);

    localStorage.setItem(`${PREFIX}:${suffix}`, lzjson);
  } catch (error) {
    console.error('setStorage', error);
  }
}
