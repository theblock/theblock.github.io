// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import type { SelectableInterface } from '../../../types';

import styles from './item.scss';

type PropTypes = {
  className?: string,
  isSelected?: boolean,
  item: SelectableInterface,
  onSelect?: (event: Event, key: string) => void
};

export default function Item ({ className, isSelected, item, onSelect }: PropTypes): React.Element<any> {
  const { icon, key, label } = item;

  const _onClick = (event) => {
    onSelect && onSelect(event, key);
  };

  return (
    <div
      className={
        compact([
          styles.ui, icon && styles.withIcon, isSelected && styles.withSelected, className
        ]).join(' ')
      }
      onMouseDown={ _onClick }
    >
      { label || key }
      {
        icon && (
          <div className={ styles.icon }>
            { icon }
          </div>
        )
      }
    </div>
  );
}
