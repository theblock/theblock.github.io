// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { autorun, computed, observable } from 'mobx';

import type { SelectableInterface } from '@theblock/lib-ui/src/types';
import type { StorageNameType, StorageValueType } from '@theblock/lib-util/src/types';

import { getStorage, setStorage } from '@theblock/lib-util/src/storage';
// import { FiatEurIcon, FiatUsdIcon } from '@theblock/lib-ui/src/icons';
import SelectStore from '@theblock/lib-ui/src/input/select/store';

import chainStore from './chains';

type CurrencyDefaultType = StorageValueType & {
  selectedKey: string;
};

const LS_DEFAULT: StorageNameType = 'currencyDefault';
const CURRENCIES: Array<SelectableInterface> = [
  {
    // icon: <FiatUsdIcon />,
    key: 'USD'
  },
  {
    // icon: <FiatEurIcon />,
    key: 'EUR'
  }
];

const currencyDefault: CurrencyDefaultType = getStorage(LS_DEFAULT);

class CurrencyStore extends SelectStore<SelectableInterface> {
  @observable chains = chainStore;

  _flat: Array<string> = [];

  constructor () {
    super(CURRENCIES, currencyDefault.selectedKey);

    this._flat = CURRENCIES.map(({ key }) => key);

    autorun(() => {
      setStorage(LS_DEFAULT, { selectedKey: this.selectedKey });
    });
  }

  @computed get all (): Array<string> {
    return [this.chains.selected.token].concat(this._flat);
  }
}

export default new CurrencyStore();
