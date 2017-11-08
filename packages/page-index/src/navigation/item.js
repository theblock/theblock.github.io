// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React, { type Element } from 'react';

import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import InputLink from '@theblock/lib-ui/src//input/link';

type PropTypes = {
  className?: string,
  isSelected?: boolean,
  item: SelectableInterface,
  onSelect?: (string) => void
};

export default function Item ({ className, isSelected, item: { key, label }, onSelect }: PropTypes): Element<any> {
  const _onClick = () => {
    onSelect && onSelect(key);
  };

  return (
    <InputLink
      isInternal
      isReadOnly={ isSelected }
      onClick={ _onClick }
      value={ label }
    />
  );
}
