// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import Trianglify from 'trianglify';

import styles from './pattern.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  seed?: any
};

type StyleType = {
  [string]: string
};

export function createPatternStyle (seed?: any): StyleType {
  return {
    backgroundImage: `url(${Trianglify({
      height: 225,
      seed: seed || Date.now(),
      variance: 1,
      width: 1500
    }).png()})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
}

export default function Pattern ({ children, className, seed }: PropTypes): ?React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      style={ createPatternStyle(seed) }
    >
      { children }
    </div>
  );
}
