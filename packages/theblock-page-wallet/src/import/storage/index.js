// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import Browser from './browser';
import { ImportStore } from '../store';

type PropTypes = {
  className?: string,
  store: ImportStore,
  t: (string) => string
};

function Storage ({ className, store, t }: PropTypes): ?React.Element<any> {
  switch (store.storeStorage.selected.key) {
    case 'browser':
      return <Browser store={ store } />;

    default:
      return null;
  }
}

export default translate(['import'])(observer(Storage));
