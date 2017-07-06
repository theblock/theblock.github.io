// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react';
import { translate } from 'react-i18next';

import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import InputLink from '@theblock/lib-ui/src//input/link';

type PropTypes = {
  className?: string,
  isSelected?: boolean,
  item: SelectableInterface,
  onSelect?: (string) => void,
  t: (string) => string
};

function Item ({ className, isSelected, item: { labeli18n, key }, onSelect, t }: PropTypes): React.Element<any> {
  const _onClick = () => {
    onSelect && onSelect(key);
  };

  return (
    <InputLink
      isInternal
      isReadOnly={ isSelected }
      onClick={ _onClick }
      value={ t(labeli18n) }
    />
  );
}

export default translate([])(Item);
