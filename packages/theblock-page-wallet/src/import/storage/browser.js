// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import InputPassword from 'theblock-lib-ui/src/input/password';

import { ImportStore } from '../store';

type PropTypes = {
  className?: string,
  store: ImportStore,
  t: (string) => string
};

function Browser ({ className, store, t }: PropTypes): ?React.Element<any> {
  if (!store.shouldVerifyPassword) {
    return null;
  }

  return (
    <Interpolate
      parent='div'
      i18nKey='storagetype.browser.text'
      inputPassword={
        <InputPassword
          isError={ store.hasEmptyPassword }
          onChange={ store.setPassword }
          value={ store.password }
        />
      }
    />
  );
}

export default translate(['import'])(observer(Browser));
