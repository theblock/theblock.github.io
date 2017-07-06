// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { MiddlewareConfigType, MiddleWareHandlerType, ProviderCallbackType, ProviderInterface } from '../types';

export default class MiddlewareProvider implements ProviderInterface {
  static handlers: MiddlewareConfigType = {};
  provider: ProviderInterface;

  constructor (provider: ProviderInterface) {
    this.provider = provider;
  }

  get chainId (): number {
    return this.provider.chainId;
  }

  get name (): string {
    return this.provider.name;
  }

  static addHandler (method: string, handler: MiddleWareHandlerType) {
    MiddlewareProvider.handlers[method] = handler;
  }

  send (method: string, params: Array<any>, callback: ProviderCallbackType): void {
    const _callback = (error: ?Error, result: ?any) => {
      if (error) {
        console.error(method, params, error);
      } else {
        console.log(method, params, result);
      }

      callback(error, result);
    };

    try {
      const handler: ?MiddleWareHandlerType = MiddlewareProvider.handlers[method];

      if (handler) {
        handler(this, method, params, _callback);
      } else {
        this.provider.send(method, params, _callback);
      }
    } catch (error) {
      _callback(error, null);
    }
  }
}
