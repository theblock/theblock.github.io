// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import ImgHash from '../img/hash';

import styles from './fingerprint.scss';

type PropTypes = {
  className?: string
};

export default function Fingerprint ({ className }: PropTypes): React.Element<any> {
  return (
    <ImgHash
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    />
  );
}
