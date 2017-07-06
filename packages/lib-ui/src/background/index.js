// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';

import backgroundStore from './store';
import styles from './background.scss';

type PropTypes = {
  className?: string
};

function Background ({ className }: PropTypes): ?React.Element<any> {
  if (!backgroundStore.isLoaded) {
    return null;
  }

  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
      style={ {
        backgroundImage: `url(${backgroundStore.sourceUrl})`
      } }
    />
  );
}

export default observer(Background);
