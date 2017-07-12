// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export type ReactStatelessComponent = (any) => React$Element<any>; // eslint-disable-line
export type ReactComponent = ReactStatelessComponent | Class<React$Component<*, any, *>>; // eslint-disable-line
