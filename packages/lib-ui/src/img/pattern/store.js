// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, observable } from 'mobx';

import type { StorageNameType } from '@theblock/lib-util/src/types';

import { getStorage, setStorage } from '@theblock/lib-util/src/storage';

const DEFAULT_SEED: string = '0x614a94c05b231269918a0a6265f80b3d5209835d710e0e0022f44a5e9d17cd6f';
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

export default new Store(defaults.seed || DEFAULT_SEED);
