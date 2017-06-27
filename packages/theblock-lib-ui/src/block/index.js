// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow
// Adapted from http://blog.learningspaces.io/animated-loading-indicator-with-isometric-cubes/

import compact from 'lodash.compact';
import React from 'react';

import styles from './block.scss';

type PropTypes = {
  className?: string
};

export default function Block ({ className }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      <div className={ [styles.cube, styles.tiny].join(' ') }>
        <div className={ styles.top } />
        <div className={ styles.left } />
        <div className={ styles.right } />
      </div>
      <div className={ [styles.cube, styles.small].join(' ') }>
        <div className={ styles.top } />
        <div className={ styles.left } />
        <div className={ styles.right } />
      </div>
      <div className={ styles.cube }>
        <div className={ styles.top } />
        <div className={ styles.left } />
        <div className={ styles.right } />
      </div>
    </div>
  );
}
