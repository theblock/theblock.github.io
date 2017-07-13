// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import jdenticon from 'jdenticon';
import compact from 'lodash.compact';
import React from 'react';
import { observer } from 'mobx-react';

import { removeHexPrefix } from '@theblock/lib-util/src/format';

import Html from '../../html';
import store from '../pattern/store';

import styles from './fingerprint.scss';

type PropTypes = {
  className?: string,
  seed?: string
};

function ImgFingerprint ({ className, seed }: PropTypes): ?React.Element<any> {
  return (
    <Html
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      html={
        jdenticon.toSvg(removeHexPrefix(seed || store.seed), 200, 0)
      }
    />
  );
}

export default observer(ImgFingerprint);
