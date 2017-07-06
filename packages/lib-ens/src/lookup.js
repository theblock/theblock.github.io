// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type Api from '@theblock/lib-api/src';
import type { AbiMethodType } from '@theblock/lib-api/src/types';

import Contract from '@theblock/lib-api/src/contract';
import { EnsResolver } from '@theblock/meta-contracts/src/abi';
import { NULL_ADDRESS } from '@theblock/lib-util/src/constants';
import { formatAddress } from '@theblock/lib-util/src/format';

import { createNameHash } from './namehash';
import { findEnsResolver } from './registrar';

const ensResolver: Contract = new Contract(EnsResolver);
const ensLookup: AbiMethodType = ensResolver.findMethod('addr');

export function lookupEnsName (api: Api, name: string) {
  return findEnsResolver(api, name)
    .then((resolverAddr) => {
      return api.call({
        data: ensLookup.encode([
          createNameHash(name)
        ]),
        to: resolverAddr
      });
    })
    .then((result) => {
      return ensLookup.decode(result);
    })
    .then(([resolvedAddress]) => {
      if (!resolvedAddress || resolvedAddress === NULL_ADDRESS) {
        throw new Error(`Unable to find endpoint for ${name}`);
      }

      return formatAddress(resolvedAddress);
    });
}
