// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { type Element } from 'react';

export interface SelectableInterface {
  hint?: ?string,
  icon?: ?Element<any>,
  isHidden?: boolean,
  key: any,
  label?: ?string
}
