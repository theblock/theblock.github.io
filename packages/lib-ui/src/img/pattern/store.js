// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, observable } from 'mobx';

import type { StorageNameType } from '@theblock/lib-util/src/types';

import { createSha3Raw } from '@theblock/lib-util/src/sha3';
import { getStorage, setStorage } from '@theblock/lib-util/src/storage';

export function toPatternSeed (value: number | string) {
  return createSha3Raw(`${value}`);
}

const LS_BACKGROUND: StorageNameType = 'background';
const defaults: { seed: string } = getStorage(LS_BACKGROUND);

class Store {
  @observable seed: string;

  constructor (seed: string) {
    this.setSeed(seed);
  }

  @action setSeed = (seed: string) => {
    this.seed = seed;
    this.saveSeed();
  }

  saveSeed = () => {
    setStorage(LS_BACKGROUND, {
      seed: this.seed
    });
  }
}

export default new Store(defaults.seed || toPatternSeed(Date.now()));
