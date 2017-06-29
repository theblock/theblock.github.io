// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import u2f from 'u2f-api';

import type { U2FApiResultType } from './types';

if (window.u2f === undefined) {
  window.u2f = u2f;
}

export function isU2FAvailable (): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!window.u2f.getApiVersion) {
      console.log('isU2FAvailable', 'supported, no getApiVersion');

      return resolve(true);
    }

    u2f.getApiVersion((version: Error | U2FApiResultType) => {
      if (!version.js_api_version) {
        console.error('isU2FAvailable', version);

        return reject(version);
      }

      console.log('isU2FAvailable', 'available with', version);

      resolve(true);
    }, 1000);
  });
}
