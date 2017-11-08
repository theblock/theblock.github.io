// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element, type Node } from 'react';

import styles from './form.scss';

type PropTypes = {
  children?: Node,
  className?: string
};

export default function Form ({ children, className }: PropTypes): Element<any> {
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
