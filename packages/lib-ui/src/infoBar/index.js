// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element, type Node } from 'react';

import styles from './infoBar.scss';

export type ErrorType = {
  message: string,
  onClose?: () => mixed,
  title: string
};

type PropTypes = {
  children?: Node,
  className?: string
};

export default function InfoBar ({ children, className }: PropTypes): Element<any> {
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
