// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

import React from 'react';

declare module 'react-i18next' {
  declare module.exports: {
    I18nextProvider: React.Element<any>,
    Interpolate: React.Element<any>,
    translate: (i18nKey?: Array<string>) => (React.Element<any>) => React.Element<any>
  }
}
