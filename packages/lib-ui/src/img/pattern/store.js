// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, observable } from 'mobx';

import type { StorageNameType } from '@theblock/lib-util/src/types';

import { getStorage, setStorage } from '@theblock/lib-util/src/storage';

const INITIAL_SEED: string = `${Date.now()}`;
const LS_BACKGROUND: StorageNameType = 'background';
const defaults: { seed: string } = getStorage(LS_BACKGROUND);

class Store {
  @observable seed: string;

  constructor (seed) {
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

export default new Store(defaults.seed || INITIAL_SEED);
