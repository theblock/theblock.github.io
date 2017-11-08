// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars */

import React from 'react';

declare module 'mobx-react' {
  declare module.exports: {
    observer: (React.Element<any>) => React.Element<any>
  };
}
