// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import { CloseIcon } from '../icons';
import Overlay from '../overlay';

import type { PopupColorType } from './types';
import styles from './infoPopup.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  color?: PopupColorType,
  onClose?: () => mixed,
  title?: string
};

export default function InfoPopup ({ children, className, color, onClose, title }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.ui, styles[`${color || 'normal'}Color`], className
        ]).join(' ')
      }
    >
      <Overlay isVisible />
      <div className={ styles.container }>
        {
          title
            ? (
              <div className={ styles.title }>
                { title }
              </div>
            )
            : null
        }
        <div className={ styles.content }>
          { children }
        </div>
        {
          onClose
            ? (
              <div className={ styles.close }>
                <CloseIcon onClick={ onClose } />
              </div>
            )
            : null
        }
      </div>
    </div>
  );
}
