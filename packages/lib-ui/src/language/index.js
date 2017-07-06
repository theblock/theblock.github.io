// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { translate } from 'react-i18next';

import Select from '../input/select';

import store from './store';
import styles from './language.scss';

type PropTypes = {
  className?: string,
  i18n: any,
  isInverted?: boolean,
  t: (string) => string
};

function Language ({ className, i18n, isInverted, t }: PropTypes): React.Element<any> {
  store.setI18Next(i18n);

  return (
    <Select
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      isInverted={ isInverted }
      store={ store } />
  );
}

export default translate()(Language);
