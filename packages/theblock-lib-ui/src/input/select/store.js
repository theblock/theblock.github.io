// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, computed, observable } from 'mobx';

import type { SelectableInterface } from '../../types';

export default class SelectStore<T: SelectableInterface> {
  @observable isOpen: boolean = false;
  @observable isSearch: boolean = false;
  @observable search: string = '';
  @observable selectedKey: any;

  @observable _items: Array<T> = [];

  constructor (items: Array<T>, selectedKey?: any, isSearch?: boolean) {
    this._items = items;
    this.isSearch = !!isSearch;

    if (selectedKey || !isSearch) {
      this.selectItem(
        selectedKey ||
        (
          this.hasItems
            ? this.filtered[0]
            : { key: '' }
        ).key
      );
    }
  }

  @computed get items (): Array<T> {
    return this._items;
  }

  @computed get hasItems (): boolean {
    return this.filtered.length !== 0;
  }

  @computed get filteredSearch (): Array<T> {
    return this.items.filter(({ key, label }) => {
      return (key && key.indexOf(this.search) !== -1) ||
        (label && label.indexOf(this.search) !== -1);
    });
  }

  @computed get filtered (): Array<T> {
    return this.isSearch && this.search
      ? this.filteredSearch
      : this.items;
  }

  @computed get longestLabel (): string {
    let longest: number = 0;
    let index: number = 0;

    this.items.forEach(({ label }, itemIndex) => {
      if (label && label.length > longest) {
        longest = label.length;
        index = itemIndex;
      }
    });

    return this.items[index].label || ' ';
  }

  @computed get longestKey (): string {
    let longest: number = 0;
    let index: number = 0;

    this.items.forEach(({ key }, itemIndex) => {
      if (key && key.length > longest) {
        longest = key.length;
        index = itemIndex;
      }
    });

    return this.items[index].key || ' ';
  }

  @computed get selected (): $Shape<T> { // eslint-disable-line no-undef
    const item: ?SelectableInterface = this.filtered.find(({ key }: T) => key === this.selectedKey);

    if (item) {
      return item;
    }

    return this.isSearch
      ? { key: this.selectedKey }
      : this.filtered[0];
  }

  @action clear = () => {
    this.setSearch('');
    this.selectItem('');
  }

  @action selectItem = (_selectedKey: string): void => {
    const item: SelectableInterface = this.filtered.find(({ key }: T) => key === _selectedKey) || { key: '' };

    this.selectedKey = item.key;
    this.setSearch(item.label || item.key);
  }

  @action setOpen = (isOpen: boolean) => {
    this.isOpen = isOpen;
  }

  @action setSearch = (search: string) => {
    this.search = search;
  }

  @action toggleOpen = () => {
    this.setOpen(!this.isOpen);
  }
}
