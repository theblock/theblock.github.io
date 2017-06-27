// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import SelectStore from 'theblock-lib-ui/src/input/select/store';
import type { SelectableInterface } from 'theblock-lib-ui/src/types';

import i18n from '../i18n';

const TYPES: Array<SelectableInterface> = [
  {
    key: 'newKey',
    label: i18n.t('import:keytype.new.label')
  },
  {
    key: 'json',
    label: i18n.t('import:keytype.json.label')
  },
  {
    key: 'brainPhrase',
    label: i18n.t('import:keytype.brainPhrase.label')
  },
  // { key: 'bipPhrase', label: i18n.t('import:keytype.bipPhrase.label') },
  {
    key: 'privateKey',
    label: i18n.t('import:keytype.privateKey.label')
  }
];

class ImportStoreType extends SelectStore {
  constructor () {
    super(TYPES, 'newKey');
  }
}

export default new ImportStoreType();
