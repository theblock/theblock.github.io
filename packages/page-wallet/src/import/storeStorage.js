// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import SelectStore from '@theblock/lib-ui/src/input/select/store';
import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import i18n from '../i18n';

const TYPES: Array<SelectableInterface> = [
  {
    key: 'browser',
    label: i18n.t('import:storagetype.browser.label')
  },
  {
    key: 'session',
    label: i18n.t('import:storagetype.session.label')
  }
];

class ImportStoreStorage extends SelectStore {
  constructor () {
    super(TYPES, 'session');
  }
}

export default new ImportStoreStorage();
