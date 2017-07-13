// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import { BusyIcon } from '../icons';

import styles from './button.scss';

type PropTypes = {
  className?: string,
  icon?: React.Element<any>,
  isBusy?: boolean,
  isDanger?: boolean,
  isDisabled?: boolean,
  isInverse?: boolean,
  label?: string,
  onClick?: (Event) => mixed
}

export default function Button ({ className, icon, isBusy, isDisabled, isDanger, isInverse, label, onClick }: PropTypes): React.Element<any> {
  return (
    <button
      className={
        compact([
          styles.ui, (isBusy || isDisabled) && styles.withDisabled, isDanger && styles.withDanger, isInverse && styles.withInverse, className
        ]).join(' ')
      }
      onClick={ !(isBusy || isDisabled) && onClick }
    >
      <div className={ styles.content }>
        {
          icon
            ? (
              <div className={ styles.icon }>
                {
                  isBusy
                    ? <BusyIcon />
                    : icon
                }
              </div>
            )
            : null
        }
        {
          label
            ? (
              <div className={ styles.label }>
                { label }
              </div>
            )
            : null
        }
      </div>
    </button>
  );
}
