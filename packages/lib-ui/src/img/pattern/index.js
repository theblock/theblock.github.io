// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { observer } from 'mobx-react';
import Trianglify from 'trianglify';

import store from './store';
import styles from './pattern.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  onClick?: (Event) => mixed,
  seed?: string
};

type StyleType = {
  [string]: string
};

export function createPatternStyle (_seed: string): StyleType {
  const seed = _seed || store.seed;

  return {
    backgroundImage: `url(${Trianglify({
      height: 300,
      seed: seed === '0'
        ? Date.now()
        : seed,
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

function ImgPattern ({ children, className, onClick, seed }: PropTypes): ?React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      onClick={ onClick }
      style={ createPatternStyle(seed || store.seed) }
    >
      { children }
    </div>
  );
}

export default observer(ImgPattern);
