// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';

import type { SelectableInterface } from '../../types';
import type Store from '../select/store';

import ImgIdentity from '../../img/identity';
import Input from '../index';
import Select from '../select';

import styles from './address.scss';

type PropTypes = {
  className?: string,
  copyValue?: string,
  example?: string,
  hideIcon?: boolean,
  hint?: string,
  isBusy?: boolean,
  isDisabled?: boolean,
  isError?: boolean,
  isReadOnly?: boolean,
  isMaxWidth?: boolean,
  isWarning?: boolean,
  label?: string,
  onChange?: (string) => mixed,
  hint?: string,
  store?: Store<SelectableInterface>,
  value: ?string,
  valueAddress: ?string
};

function InputAddress ({ className, copyValue, example, hideIcon, hint, isBusy, isDisabled, isError, isReadOnly, isMaxWidth, isWarning, label, onChange, store, value, valueAddress }: PropTypes): React.Element<any> {
  const classes: string = compact([
    styles.ui, className
  ]).join(' ');
  const icon: ?React.Element<any> = (
    isError
      ? null
      : <ImgIdentity value={ valueAddress || value } />
  );

  if (store) {
    return (
      <Select
        className={ classes }
        copyValue={ copyValue }
        example={ example }
        hideIcon={ hideIcon || isError }
        hint={ hint }
        icon={ icon }
        isBusy={ isBusy }
        isDisabled={ isDisabled }
        isError={ isError }
        isReadOnly={ isReadOnly }
        isMaxWidth={ isMaxWidth }
        isWarning={ isWarning }
        label={ label }
        onChange={ onChange }
        store={ store }
        value={ value }
      />
    );
  }

  return (
    <Input
      className={ classes }
      copyValue={ copyValue }
      example={ example }
      hideIcon={ hideIcon || isError }
      hint={ hint }
      icon={ icon }
      isBusy={ isBusy }
      isDisabled={ isDisabled }
      isError={ isError }
      isReadOnly={ isReadOnly }
      isMaxWidth={ isMaxWidth }
      isWarning={ isWarning }
      label={ label }
      onChange={ onChange }
      value={ value }
    />
  );
}

export default observer(InputAddress);
