// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { computed } from 'mobx';

import SelectStore from 'theblock-lib-ui/src/input/select/store';
import type { SelectableInterface } from 'theblock-lib-ui/src/types';

import i18n from '../i18n';
import accounts from '../store/accounts';

const TYPES: Array<SelectableInterface> = [
  {
    key: 'send',
    label: i18n.t('navigation:location.send')
  },
  {
    key: 'importAccount',
    label: i18n.t('navigation:location.importAccount')
  },
  {
    key: 'listAccounts',
    label: i18n.t('navigation:location.listAccounts')
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
