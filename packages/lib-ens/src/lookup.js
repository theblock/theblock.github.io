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

export async function lookupEnsName (api: Api, name: string): Promise<string> {
  const resolverAddr: string = await findEnsResolver(api, name);
  const lookupResult: string = await api.call({
    data: ensLookup.encode([createNameHash(name)]),
    to: resolverAddr
  });
  const [lookupAddress: string] = await ensLookup.decode(lookupResult);

  if (!lookupAddress || lookupAddress === NULL_ADDRESS) {
    throw new Error(`Unable to find endpoint for ${name}`);
  }

  return formatAddress(lookupAddress);
}
