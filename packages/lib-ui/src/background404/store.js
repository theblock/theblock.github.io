// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, computed, observable } from 'mobx';

import { preloadImage } from '@theblock/lib-util/src/image';

const SOURCES: Array<string> = [
  'baby-001-960.jpg',
  'baby-002-960.jpg',
  'baby-003-960.jpg',
  'baby-004-960.jpg',
  'baby-005-960.jpg',
  'baby-006-960.jpg',
  'baby-007-960.jpg',
  'baby-008-960.jpg',
  'baby-009-960.jpg',
  'baby-010-960.jpg',
  'baby-011-960.jpg'
].map((image) => `assets/404/${image}`);

export class BackgroundStore {
  @observable index: number = 0;
  @observable isLoaded: boolean = false;

  constructor () {
    this.index = Math.floor(Math.random() * SOURCES.length);

    preloadImage(this.sourceUrl, this.setLoaded);
  }

  @action setLoaded = () => {
    this.isLoaded = true;
  }

  @computed get sourceUrl (): string {
    return SOURCES[this.index];
  }
}

export default new BackgroundStore();
