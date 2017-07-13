// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type Api from '@theblock/lib-api/src';
import type { AbiMethodType } from '@theblock/lib-api/src/types';
import type { ContractLocationType } from '@theblock/meta-contracts/src/types';

import Contract from '@theblock/lib-api/src/contract';
import registrarDefinition from '@theblock/meta-contracts/src/contracts/definitions/ensRegistrar';
import { EnsRegistrar } from '@theblock/meta-contracts/src/abi';
import { NULL_ADDRESS } from '@theblock/lib-util/src/constants';
import { formatAddress } from '@theblock/lib-util/src/format';

import { createNameHash } from './namehash';

const ensRegistrar: Contract = new Contract(EnsRegistrar);
const ensResolve: AbiMethodType = ensRegistrar.findMethod('resolver');

export async function findEnsResolver (api: Api, name: string): Promise<string> {
  const _chainId: number = await api.getChainId();
  const registrar: ?ContractLocationType = registrarDefinition.where.find(({ chainId }) => chainId === _chainId);

  if (!registrar) {
    throw new Error('Unable to find ENS registrar location');
  }

  const resolverResult: string = await api.call({
    data: ensResolve.encode([createNameHash(name)]),
    to: registrar.address
  });
  const [resolverAddress: string] = await ensResolve.decode(resolverResult);

  if (!resolverAddress || resolverAddress === NULL_ADDRESS) {
    throw new Error(`Unable to find resolver for ${name}`);
  }

  return formatAddress(resolverAddress);
}
