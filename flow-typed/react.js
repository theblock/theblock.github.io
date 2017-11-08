// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

/* eslint-disable no-unused-vars,no-undef */

import React from 'react';

export type ReactStatelessComponent = (any) => React$Element<any>;
export type ReactComponent = ReactStatelessComponent | Class<React$Component<*, any, *>>;
