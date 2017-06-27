// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import i18next from 'i18next';

import resources from '../i18n';

i18next.init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources
});

export default i18next;
