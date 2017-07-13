// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, computed, observable } from 'mobx';

import patternStore from '@theblock/lib-ui/src/img/pattern/store';
import { createSha3 } from '@theblock/lib-util/src/sha3';

let counter = 0;

class Store {
  @observable seeds: Array<string> = [];

  constructor () {
    this.generateSeeds(14);
  }

  @computed get seed (): string {
    return patternStore.seed;
  }

  @action generateSeeds = (index: number) => {
    const time: number = Date.now();
    const seeds: Array<string> = [];
    let count: number = 14;

    while (count--) {
      seeds.push(createSha3(`${this.seed}_${time}_${counter++}`));
    }

    this.seeds = seeds;
  }

  @action setSeed = (seed: string, index: number) => {
    patternStore.setSeed(seed);

    this.generateSeeds(index);
  }
}

export default new Store();
