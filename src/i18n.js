// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import i18next from 'i18next';
import uniq from 'lodash.uniq';

import resourcesUI from '@theblock/lib-ui/i18n';

function combineWithUI (resources: any): any {
  return uniq(
    [].concat(
      Object.keys(resourcesUI),
      Object.keys(resources)
    )
  ).reduce((result, key) => {
    result[key] = Object.assign({}, resources[key] || {}, resourcesUI[key] || {});
    return result;
  }, {});
}

export default function initI18N (resources: any) {
  i18next.init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    // lng: 'de', // overrides default language detection
    resources: combineWithUI(resources)
  });

  return i18next;
}
