// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, computed, observable } from 'mobx';

import patternStore from '@theblock/lib-ui/src/img/pattern/store';
import { createSha3 } from '@theblock/lib-util/src/sha3';

let counter = Date.now();

class Store {
  @observable seeds: Array<string> = [];

  constructor () {
    this.generateSeeds(0);
  }

  @computed get seed (): string {
    return patternStore.seed;
  }

  @action generateSeeds = (start: number) => {
    const seeds: Array<string> = this.seeds.filter((seed, index) => index > start);

    while (seeds.length !== 14) {
      seeds.push(createSha3(`${this.seed}${counter++}`));
    }

    this.seeds = seeds;
  }

  @action setSeed = (seed: string, index: number) => {
    patternStore.setSeed(seed);

    this.generateSeeds(index);
  }
}

export default new Store();
