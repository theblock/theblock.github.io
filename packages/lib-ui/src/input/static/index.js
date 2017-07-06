// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import Input from '../index';

import styles from './static.scss';

type PropTypes = {
  className?: string,
  icon?: ?React.Element<any>,
  isError?: boolean,
  isWarning?: boolean,
  value?: string
};

export default function InputStatic ({ className, icon, isError, isWarning, value }: PropTypes): React.Element<any> {
  return (
    <Input
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      icon={ icon }
      isError={ isError }
      isReadOnly
      isWarning={ isWarning }
      value={ value }
    />
  );
}
