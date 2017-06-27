// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react'; // eslint-disable-line

declare module 'react-i18next' {
  declare var exports: {
    I18nextProvider: React.Element<any>,
    Interpolate: React.Element<any>,
    translate: (i18nKey?: Array<string>) => (React.Element<any>) => React.Element<any>
  }
}
