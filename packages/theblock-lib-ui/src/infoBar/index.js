// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import styles from './infoBar.scss';

export type ErrorType = {
  message: string,
  onClose?: () => void,
  title: string
};

type PropTypes = {
  children?: React.Element<any>,
  className?: string
};

export default function InfoBar ({ children, className }: PropTypes): React.Element<any> {
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
