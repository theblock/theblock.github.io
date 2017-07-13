// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { translate } from 'react-i18next';

import Navigation from '@theblock/lib-ui/src/navigation';

import styles from './settings.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Settings ({ className, t }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <Navigation />
      <main />
    </div>
  );
}

export default translate(['settings'])(Settings);
