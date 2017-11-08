// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element } from 'react';
import { translate } from 'react-i18next';

import { EyeIcon } from '../../icons';
import Input from '../index';
import Tooltip from '../../tooltip';

import styles from './password.scss';

const MASKED: string = '********************';

type PropTypes = {
  className?: string,
  example?: string,
  hint?: string,
  icon?: ?Element<any>,
  isDisabled?: boolean,
  isError?: boolean,
  isInteger?: boolean,
  isReadOnly?: boolean,
  isWarning?: boolean,
  label?: string,
  onChange?: (string) => mixed,
  t: (string) => string,
  value?: string,
  valueDisplay?: ?string,
};

function InputPassword ({ className, example, hint, icon, isDisabled, isError, isInteger, isReadOnly, isWarning, label, onChange, t, value, valueDisplay }: PropTypes): Element<any> {
  let text = valueDisplay;

  if (!text) {
    if (!value || !value.length) {
      text = t(`ui:input.password.noPassword`);
    } else {
      text = MASKED.slice(-1 * Math.min(value.length, 15));
    }
  }

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
      iconExtra={
        value
          ? (
            <Tooltip value={ value }>
              <EyeIcon />
            </Tooltip>
          )
          : null
      }
      isDisabled={ isDisabled }
      isError={ isError }
      isReadOnly={ isReadOnly }
      isWarning={ isWarning }
      label={ label }
      onChange={ onChange }
      type='password'
      value={ value }
      valueDisplay={ text }
    />
  );
}

export default translate()(InputPassword);
