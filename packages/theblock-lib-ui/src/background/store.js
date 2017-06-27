// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, computed, observable } from 'mobx';

import { preloadImage } from 'theblock-lib-util/src/image';

const CHANGE_DURATION: number = 60000;
const SOURCES: Array<string> = [
  'mountain-001-960.jpg',
  'mountain-002-960.jpg',
  'mountain-003-960.jpg',
  'mountain-004-960.jpg',
  'mountain-005-960.jpg',
  'mountain-006-960.jpg',
  'mountain-007-960.jpg',
  'mountain-008-960.jpg'
].map((image) => `/assets/backgrounds/${image}`);

export class BackgroundStore {
  @observable isLoaded: boolean = false;
  @observable index: number = 0;

  intervalId: number = 0;

  constructor () {
    this.index = Math.floor(Math.random() * SOURCES.length);
    this.preloadNextImage();

    preloadImage(this.sourceUrl, this.setLoaded);

    this.intervalId = setInterval(this.incrementIndex, CHANGE_DURATION);
  }

  @computed get sourceUrl (): string {
    return SOURCES[this.index];
  }

  @action setLoaded = () => {
    this.isLoaded = true;
  }

  @action incrementIndex = () => {
    this.index = this.getNextIndex();

    this.preloadNextImage();
  }

  getNextIndex (): number {
    const index: number = this.index + 1;

    return index === SOURCES.length
      ? 0
      : index;
  }

  preloadNextImage () {
    preloadImage(SOURCES[this.getNextIndex()]);
  }
}

export default new BackgroundStore();
