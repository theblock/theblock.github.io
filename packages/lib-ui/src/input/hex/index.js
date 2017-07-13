// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import Input from '../index';

import styles from './hex.scss';

type PropTypes = {
  className?: string,
  example?: string,
  hint?: string,
  icon?: ?React.Element<any>,
  isDisabled?: boolean,
  isError?: boolean,
  isReadOnly?: boolean,
  isWarning?: boolean,
  label?: string,
  onChange?: (string) => mixed,
  type?: string,
  value?: string,
  valueDisplay?: ?string,
};

export default function InputHex ({ className, example, hint, icon, isDisabled, isError, isReadOnly, isWarning, label, onChange, value, valueDisplay }: PropTypes): React.Element<any> {
  const _onChange = (_value: string): void => {
    const value: string = _value.replace('0x0x', '0x'); // in the case of case of pasting

    onChange && (value === '0x' || /^0x[0-9a-fA-F]+$/.test(value)) && onChange(value);
  };

  return (
    <Input
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      example={ example }
      hint={ hint }
      icon={ icon }
      isDisabled={ isDisabled }
      isError={ isError }
      isReadOnly={ isReadOnly }
      isWarning={ isWarning }
      label={ label }
      onChange={ _onChange }
      value={ value }
      valueDisplay={ valueDisplay }
    />
  );
}
