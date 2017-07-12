// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import InfoPopup from '../infoPopup';

import styles from './errors.scss';

export type ErrorType = {
  id?: string,
  message: string,
  onClose?: () => mixed,
  title: string
};

type PropTypes = {
  className?: string,
  errors: Array<ErrorType>
};

export default function Errors ({ className, errors }: PropTypes): ?React.Element<any> {
  if (!errors.length) {
    return null;
  }

  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      {
        errors.map(({ id, message, onClose, title }, index: number) => (
          <InfoPopup
            color='red'
            key={ id || index }
            onClose={ onClose }
            title={ title }
          >
            <section>
              { message }
            </section>
          </InfoPopup>
        ))
      }
    </div>
  );
}
