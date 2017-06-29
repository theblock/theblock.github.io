// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react';

export interface SelectableInterface {
  hint?: ?string,
  icon?: ?React.Element<any>,
  isHidden?: boolean,
  key: any,
  label?: ?string
}
