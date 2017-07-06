// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import '@theblock/lib-ui/src/ui.scss';

import resources from '@theblock/page-blog/i18n';
import Blog from '@theblock/page-blog/src';

import initI18N from './i18n';

const i18n = initI18N(resources);

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Blog summaries={ (process.env.BLOG_ENTRIES || '').split(',') } />
  </I18nextProvider>,
  document.getElementById('content')
);
