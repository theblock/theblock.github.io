// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, autorun, computed, observable } from 'mobx';

import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import SelectStore from '@theblock/lib-ui/src/input/select/store';

import chainStore from './chains';
import currencyStore from './currencies';
import tokenStore from './tokens';

type ValueTypeType = SelectableInterface & {
  isNative?: ?boolean,
};

class ValueTypeStore extends SelectStore<ValueTypeType> {
  @observable chains = chainStore;
  @observable tokens = tokenStore;

  constructor () {
    super(currencyStore._items, '');

    autorun(() => {
      if (!this.selected.isNative) {
        currencyStore.selectItem(this.selected.key);
      }
    });
  }

  @computed get items (): Array<ValueTypeType> {
    return [{
      // icon: this.tokens.selected.icon,
      key: this.tokens.selected.token,
      isNative: true
    }].concat(this._items.slice());
  }

  @action selectToken = () => {
    this.selectItem(this.tokens.selected.token);
  }
}

export default new ValueTypeStore();
