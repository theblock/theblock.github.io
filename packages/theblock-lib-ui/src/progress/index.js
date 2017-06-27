// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import styles from './progress.scss';

type PropTypes = {
  className?: string,
  label?: string
};

export default function Progress ({ className, label }: PropTypes): ?React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      <div
        className={
          [
            styles.c100,
            styles.p50,
            styles.big
          ].join(' ')
        }
      >
        <span>{ label }</span>
        <div className={ styles.slice }>
          <div className={ styles.bar } />
          <div className={ styles.fill } />
        </div>
      </div>
    </div>
  );
}
