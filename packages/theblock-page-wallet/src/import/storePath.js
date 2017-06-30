// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import SelectStore from 'theblock-lib-ui/src/input/select/store';
import type { SelectableInterface } from 'theblock-lib-ui/src/types';

import i18n from '../i18n';

const TYPES: Array<SelectableInterface> = [
  {
    key: 'ledger',
    label: i18n.t('import:path.type.ledger.label')
  },
  {
    key: 'trezor',
    label: i18n.t('import:path.type.trezor.label')
  }
];

class ImportStorePath extends SelectStore {
  constructor () {
    super(TYPES, 'ledger');
  }
}

export default new ImportStorePath();
