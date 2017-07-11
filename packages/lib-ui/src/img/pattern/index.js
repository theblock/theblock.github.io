// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import Trianglify from 'trianglify';

import styles from './pattern.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  seed?: string
};

type StyleType = {
  [string]: string
};

const INITIAL_SEED: string = `${Date.now()}`;

export function createPatternStyle (seed?: string): StyleType {
  return {
    backgroundImage: `url(${Trianglify({
      height: 225,
      seed: seed || INITIAL_SEED,
      stroke_color: '#ffffff',
      stroke_width: 1,
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
