// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import MiddlewareProvider from '@theblock/lib-api/src/provider/middleware';

import sendTransactionHandler from './sendTransaction';

export default function injectHandlers () {
  MiddlewareProvider.addHandler('eth_sendTransaction', sendTransactionHandler);
}
