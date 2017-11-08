// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element } from 'react';

import styles from './html.scss';

type PropTypes = {
  className?: string,
  html: string
};

export default function Html ({ className, html }: PropTypes): Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      dangerouslySetInnerHTML={ {
        __html: html
      } }
    />
  );
}
