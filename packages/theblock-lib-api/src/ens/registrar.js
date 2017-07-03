// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { ContractLocationType } from 'theblock-meta-contracts/src/types';
import type { AbiMethodType } from '../types';

import registrarDefinition from 'theblock-meta-contracts/src/contracts/definitions/ensRegistrar';
import { EnsRegistrar, EnsResolver } from 'theblock-meta-contracts/src/abi';

import Api from '../index';
import Contract from '../contract';

const ensRegistrar: Contract = new Contract(EnsRegistrar);
const ensResolve: AbiMethodType = ensRegistrar.findMethod('resolver');

const ensResolver: Contract = new Contract(EnsResolver);
const ensLookup: AbiMethodType = ensResolver.findMethod('addr');

export function findResolver (api: Api, name: string) {
  return api
    .getChainId()
    .then((_chainId: number) => {
      const location: ?ContractLocationType = registrarDefinition.where.find(({ chainId }) => chainId === _chainId);

      if (!location) {
        throw new Error('Unable to find ENS registrar location');
      }

      // encode top-level only
      const data: string = ensResolve.encode([name]);

      return api.call(data);
    });
}

export function lookupName (api: Api, name: string) {
  return findResolver(api, name)
    .then((resolveAddr) => {
      const data: string = ensLookup.encode([name]);

      return api.call(data);
    });
}
