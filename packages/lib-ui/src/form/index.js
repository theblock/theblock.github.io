// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import styles from './form.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string
};

export default function Form ({ children, className }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      { children }
    </div>
  );
}
