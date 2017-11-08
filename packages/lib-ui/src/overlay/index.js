// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element, type Node } from 'react';

import styles from './overlay.scss';

type PropTypes = {
  children?: Node,
  className?: string,
  isVisible?: boolean,
  onClick?: (Event) => mixed
};

export default function Overlay ({ children, className, isVisible, onClick }: PropTypes): ?Element<any> {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      onClick={ onClick }
    >
      { children }
    </div>
  );
}
