// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import Clipboard from '../../clipboard';
import { LinkIcon } from '../../icons';
import Input from '../index';

import styles from './link.scss';

type PropTypes = {
  className?: string,
  copyValue?: ?string,
  href?: string,
  isInternal?: boolean,
  isInverted?: boolean,
  isMedWidth?: boolean,
  isReadOnly?: boolean,
  isWarning?: boolean,
  icon?: ?React.Element<any>,
  onClick?: () => mixed,
  value?: ?string
};

export default function InputLink ({ className, copyValue, href, icon, isInternal, isInverted, isMedWidth, isReadOnly, isWarning, onClick, value }: PropTypes): React.Element<any> {
  const _onClick = (event: Event) => {
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();

      onClick();
    }
  };

  const link: React.Element<any> = (
    <a
      href={ href || '#' }
      onClick={ _onClick }
      rel='noopener'
      target={
        isInternal
          ? '_self'
          : '_blank'
      }
    >
      <Input
        className={
          compact([
            styles.ui, className
          ]).join(' ')
        }
        icon={
          isInternal
            ? icon
            : <LinkIcon className={ styles.linkIcon } />
        }
        isLink
        isInverted={ isInverted }
        isMedWidth={ isMedWidth }
        isReadOnly={ isReadOnly }
        isWarning={ isWarning }
        value={ value }
      />
    </a>
  );

  return copyValue
    ? (
      <span>
        { link }
        <Clipboard
          className={ styles.copy }
          value={ copyValue }
        />
      </span>
    )
    : link;
}
