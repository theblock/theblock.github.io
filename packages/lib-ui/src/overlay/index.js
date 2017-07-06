// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import styles from './overlay.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  isVisible?: boolean,
  onClick?: (event: Event) => void
};

export default function Overlay ({ children, className, isVisible, onClick }: PropTypes): ?React.Element<any> {
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
