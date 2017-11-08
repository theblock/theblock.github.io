// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element } from 'react';
import Dropzone from 'react-dropzone';
import { translate } from 'react-i18next';

import { FileIcon } from '../../icons';
import Input from '../index';

import styles from './file.scss';

type PropTypes = {
  className?: string,
  icon?: ?Element<any>,
  isError?: boolean,
  isWarning?: boolean,
  onChange: (name: string, contents: string) => mixed,
  t: (string) => string,
  value?: ?string
};

function InputFile ({ className, icon, isError, isWarning, onChange, t, value }: PropTypes): Element<any> {
  const _onDrop = (files?: Array<File>) => {
    if (files && files.length) {
      const reader = new FileReader();
      const file: File = files[0];

      reader.onload = ({ target: { result } }) => {
        onChange(file.name, result);
      };

      reader.readAsText(file);
    }
  };

  return (
    <Input
      className={
        compact([
          styles.ui, isError && styles.withError, isWarning && styles.withWarning, className
        ]).join(' ')
      }
      icon={ icon }
      iconAction={ <FileIcon /> }
      isError={ isError }
      value={ value || t(`ui:input.file.noFile`) }
    >
      <Dropzone
        activeClassName={ styles.focus }
        className={ styles.input }
        multiple={ false }
        onDrop={ _onDrop }
      >
        &nbsp;
      </Dropzone>
    </Input>
  );
}

export default translate()(InputFile);
