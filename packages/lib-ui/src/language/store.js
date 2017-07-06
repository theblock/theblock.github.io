// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, autorun } from 'mobx';
import moment from 'moment';

import type { StorageNameType } from '@theblock/lib-util/src/types';
import type { SelectableInterface } from '../types';

import { getStorage, setStorage } from '@theblock/lib-util/src/storage';

import languages from '../../i18n/en/languages';
import SelectStore from '../input/select/store';

const LS_LANGUAGE: StorageNameType = 'i18nDefault';

const LANGUAGES: Array<SelectableInterface> = Object.keys(languages).map((key) => {
  return {
    key,
    label: languages[key]
  };
});

const defaultLanguage: { selectedKey: string } = getStorage(LS_LANGUAGE) || {
  selectedKey: 'en'
};

moment.locale(defaultLanguage.selectedKey);

export class LanguageStore extends SelectStore {
  i18next: { changeLanguage: (string) => void };

  constructor () {
    super(LANGUAGES, defaultLanguage.selectedKey);

    autorun(() => {
      this.setLanguage();

      setStorage(LS_LANGUAGE, {
        selectedKey: this.selectedKey
      });
    });
  }

  @action setI18Next = (i18next: any) => {
    this.i18next = i18next;
    this.setLanguage();
  }

  @action setLanguage = () => {
    if (this.i18next && this.i18next.language !== this.selectedKey) {
      this.i18next.changeLanguage(this.selectedKey);
      moment.locale(this.selectedKey);
    }
  }
}

export default new LanguageStore();
