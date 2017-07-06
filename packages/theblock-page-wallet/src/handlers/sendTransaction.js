// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { ProviderCallbackType, ProviderInterface } from '@theblock/lib-api/src/types';

import transactionStore from '../store/transactions';

export default function execute (provider: ProviderInterface, method: string, params: Array<any>, callback: ProviderCallbackType): void {
  callback(null, transactionStore.addTransaction(provider, params[0]));
}
