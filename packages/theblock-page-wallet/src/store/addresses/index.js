// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { computed, observable } from 'mobx';

import SelectStore from 'theblock-lib-ui/src/input/select/store';

import type AddressStore from './address';

import accountsStore from '../accounts';

class AddressesStore extends SelectStore<AddressStore> {
  @observable accounts = accountsStore;

  constructor () {
    super([], '', true);
  }

  @computed get items (): Array<AddressStore> {
    return this.accounts.items.concat(this._items.slice());
  }
}

export default new AddressesStore();
