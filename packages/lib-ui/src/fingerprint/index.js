// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element } from 'react';

import ImgFingerprint from '../img/fingerprint';

import styles from './fingerprint.scss';

type PropTypes = {
  className?: string
};

export default function Fingerprint ({ className }: PropTypes): Element<any> {
  return (
    <ImgFingerprint
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    />
  );
}
