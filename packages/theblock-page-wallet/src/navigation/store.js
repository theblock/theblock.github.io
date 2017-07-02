// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { computed } from 'mobx';

import SelectStore from 'theblock-lib-ui/src/input/select/store';
import type { SelectableInterface } from 'theblock-lib-ui/src/types';

import accounts from '../store/accounts';

const TYPES: Array<SelectableInterface> = [
  {
    key: 'send',
    label: 'subnav:location.send'
  },
  {
    key: 'importAccount',
    label: 'subnav:location.importAccount'
  },
  {
    key: 'listAccounts',
    label: 'subnav:location.listAccounts'
  }
];

class NavigationStore extends SelectStore {
  constructor () {
    super(TYPES, 'listAccounts');
  }

  @computed get filtered (): Array<SelectableInterface> {
    return this.items.filter(({ key }) => accounts.hasAccounts || key === 'importAccount');
  }
}

export default new NavigationStore();
