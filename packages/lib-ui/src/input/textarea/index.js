// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import Input from '../index';

import styles from './textarea.scss';

type PropTypes = {
  className?: string,
  example?: string,
  hint?: string,
  icon?: ?React.Element<any>,
  isDisabled?: boolean,
  isError?: boolean,
  isInteger?: boolean,
  isMaxWidth?: boolean,
  isReadOnly?: boolean,
  isWarning?: boolean,
  label?: string,
  onChange?: (string) => mixed,
  rows?: number,
  value?: string,
  valueDisplay?: ?string,
};

export default function InputTextarea ({ className, example, hint, icon, isDisabled, isError, isInteger, isMaxWidth, isReadOnly, isWarning, label, onChange, rows = 5, value, valueDisplay }: PropTypes): React.Element<any> {
  const _onChange = ({ target: { value } }: { target: HTMLInputElement }): void => {
    onChange && onChange(value);
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
      isMaxWidth={ isMaxWidth }
      isReadOnly={ isReadOnly }
      isWarning={ isWarning }
      label={ label }
      value={ value }
      valueDisplay={ valueDisplay }
    >
      <textarea
        onChange={ _onChange }
        rows={ 1 }
        value={ value }
      />
    </Input>
  );
}
