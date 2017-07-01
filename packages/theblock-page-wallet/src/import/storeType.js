// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observable } from 'mobx';

import SelectStore from 'theblock-lib-ui/src/input/select/store';
import type { SelectableInterface } from 'theblock-lib-ui/src/types';

import { isU2FAvailable } from 'theblock-lib-hw/src/u2f';

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
  {
    key: 'bipPhrase',
    label: i18n.t('import:keytype.bipPhrase.label')
  },
  {
    key: 'privateKey',
    label: i18n.t('import:keytype.privateKey.label')
  },
  {
    isHidden: true,
    key: 'ledger',
    label: i18n.t('import:keytype.ledger.label')
  },
  {
    key: 'trezor',
    label: i18n.t('import:keytype.trezor.label')
  }
];

class ImportStoreType extends SelectStore {
  @observable withLedger: boolean = false;

  constructor () {
    super(TYPES, 'newKey');

    isU2FAvailable().then((isAvailable: boolean) => {
      if (isU2FAvailable) {
        this.withLedger = true;
        this.unhideItem('ledger');
      }
    });
  }
}

export default new ImportStoreType();
