// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react'; // eslint-disable-line

declare module 'mobx-react' {
  declare module.exports: {
    observer: (React.Element<any>) => React.Element<any>
  };
}
