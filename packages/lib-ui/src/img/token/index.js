// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import { preloadImage } from '@theblock/lib-util/src/image';

import type { SizeType } from '../identity';

import styles from './token.scss';

type TokenType = 'eth' | 'etc';

type PropTypes = {
  className?: string,
  size?: SizeType,
  src?: string,
  value?: TokenType
};

const TOKENS: { [?TokenType]: string } = {
  etc: preloadImage('/assets/tokens/etc-128.png'),
  eth: preloadImage('/assets/tokens/eth-128.png')
};

export default function ImgToken ({ className, size = 'normal', src, value }: PropTypes): React.Element<any> {
  return (
    <img
      className={
        compact([
          styles.ui, styles[size], className
        ]).join(' ')
      }
      src={ src || TOKENS[value] }
    />
  );
}
