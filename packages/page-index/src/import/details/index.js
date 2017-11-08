// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React, { type Element } from 'react';
import { translate } from 'react-i18next';

import Bip from './bip';
import Brain from './brain';
import Json from './json';
import PrivateKey from './private';
import { ImportStore } from '../store';

type PropTypes = {
  className?: string,
  store: ImportStore,
  t: (string) => string
};

function Details ({ className, store, t }: PropTypes): ?Element<any> {
  switch (store.storeType.selected.key) {
    case 'bipPhrase':
      return <Bip store={ store } />;

    case 'brainPhrase':
      return <Brain store={ store } />;

    case 'json':
      return <Json store={ store } />;

    case 'privateKey':
      return <PrivateKey store={ store } />;

    default:
      return null;
  }
}

export default translate(['import'])(observer(Details));
