// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import Clipboard from '../clipboard';
import { BusyIcon, EditIcon } from '../icons';

import styles from './input.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  copyValue?: ?string,
  example?: string,
  hideIcon?: boolean,
  hint?: string,
  icon?: ?React.Element<any>,
  iconAction?: ?React.Element<any>,
  iconExtra?: ?React.Element<any>,
  inputProps?: { [string]: any },
  isBusy?: boolean,
  isDisabled?: boolean,
  isError?: boolean,
  isInverted?: boolean,
  isLink?: boolean,
  isMaxWidth?: boolean,
  isMedWidth?: boolean,
  isReadOnly?: boolean,
  isWarning?: boolean,
  label?: string,
  onBlur?: () => mixed,
  onChange?: (string) => mixed,
  type?: string,
  value?: any,
  valueDisplay?: ?string
};

export default function Input ({ children, className, copyValue, example, hideIcon, hint, icon, iconAction, iconExtra, inputProps = {}, isBusy, isDisabled, isError, isInverted, isLink, isMaxWidth, isMedWidth, isReadOnly, isWarning, label, onBlur, onChange, type = 'text', value, valueDisplay }: PropTypes): React.Element<any> {
  const _onBlur = (): void => {
    onBlur && onBlur();
  };

  const _onChange = ({ target: { value } }: { target: HTMLInputElement }): void => {
    onChange && onChange(value);
  };

  const text: string = valueDisplay || value || '';

  return (
    <div
      className={
        compact([
          styles.ui, (icon && !hideIcon) && styles.withIcon, isBusy && styles.withBusy, isDisabled && styles.withDisabled, isError && styles.withError, isInverted && styles.withInvert, isLink && styles.withLink, isMaxWidth && styles.withMaxWidth, isMedWidth && styles.withMedWidth, isReadOnly && styles.withReadOnly, isWarning && styles.withWarning, className
        ]).join(' ')
      }
    >
      <div className={ styles.content }>
        <div className={ styles.mask }>
          {
            text
              ? (
                <div className={ styles.value }>
                  { text }
                </div>
              )
              : (
                <div className={ styles.example }>
                  { example }
                </div>
              )
          }
          {
            isDisabled || isLink || isReadOnly
              ? null
              : (
                <div className={ styles.iconAction }>
                  { iconAction || <EditIcon /> }
                </div>
              )
          }
        </div>
        <div className={ styles.inputContainer }>
          {
            (!isReadOnly && !isLink)
              ? (
                children || (
                  <input
                    onBlur={ _onBlur }
                    onChange={ _onChange }
                    type={ type }
                    value={ value }
                    { ...inputProps }
                  />
                )
              )
              : null
          }
          {
            (icon && !hideIcon)
              ? (
                <div className={ styles.icon }>
                  { icon }
                </div>
              )
              : null
          }
          {
            isBusy
              ? (
                <div className={ styles.iconBusy }>
                  <BusyIcon />
                </div>
              )
              : null
          }
        </div>
      </div>
      {
        copyValue || iconExtra
          ? (
            <div className={ styles.extraIcon }>
              { iconExtra || <Clipboard value={ copyValue || '' } /> }
            </div>
          )
          : null
      }
    </div>
  );
}
