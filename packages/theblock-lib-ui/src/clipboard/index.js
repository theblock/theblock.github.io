// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { ClipboardIcon } from '../icons';
import Tooltip from '../tooltip';

import styles from './clipboard.scss';

type PropTypes = {
  className?: string,
  value: string
};

export default function Clipboard ({ className, value }: PropTypes): React.Element<any> {
  const _onCopy = () => console.log('Copied to Clipboard', value);

  return (
    <Tooltip value={ value }>
      <CopyToClipboard
        className={
          compact([
            styles.ui, className
          ]).join(' ')
        }
        onCopy={ _onCopy }
        text={ value }
      >
        <ClipboardIcon />
      </CopyToClipboard>
    </Tooltip>
  );
}
