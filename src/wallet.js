// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import 'theblock-lib-ui/src/ui.scss';

import resources from 'theblock-page-wallet/i18n';
import Wallet from 'theblock-page-wallet/src';

import initI18N from './i18n';

const i18n = initI18N(resources);

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Wallet />
  </I18nextProvider>,
  document.getElementById('content')
);