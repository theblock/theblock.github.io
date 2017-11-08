// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import blockies from 'blockies';
import compact from 'lodash.compact';
import React, { type Element } from 'react';

import { isAddressValid } from '@theblock/lib-util/src/validate';

import { EmptyIcon, NullIcon } from '../../icons';

import styles from './identity.scss';

export type SizeType = 'inline' | 'large' | 'normal';

export const NULL_ADDRESS: string = '0x0000000000000000000000000000000000000000';

const SCALE_DEFAULT: number = 4;
const SCALE_MATRIX: { [SizeType]: number } = {
  'inline': 2,
  'large': 8,
  'normal': SCALE_DEFAULT
};

type PropTypes = {
  className?: string,
  size?: SizeType,
  value: ?string
};

export function createImgIdentity (address: ?string, size: SizeType = 'normal'): string {
  return blockies({
    seed: (address || '').toLowerCase(),
    size: 8,
    scale: SCALE_MATRIX[size] || SCALE_DEFAULT
  }).toDataURL('image/png');
}

export default function ImgIdentity ({ className, size = 'normal', value }: PropTypes): Element<any> {
  const classes = compact([
    styles.ui, styles[size], className
  ]).join(' ');

  if (value === NULL_ADDRESS) {
    return (
      <NullIcon className={ classes } />
    );
  } else if (!isAddressValid(value)) {
    return (
      <EmptyIcon className={ classes } />
    );
  }

  return (
    <img
      className={ classes }
      src={
        createImgIdentity(value, size)
      }
    />
  );
}
