// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import flatten from 'lodash.flatten';
import { autorun } from 'mobx';
import React from 'react';

import type { ProviderInterface } from '@theblock/lib-api/src/types';
import type { ExplorerInterface } from '@theblock/lib-services/src/types';
import type { SelectableInterface } from '@theblock/lib-ui/src/types';
import type { StorageNameType, StorageValueType } from '@theblock/lib-util/src/types';

import Api from '@theblock/lib-api/src';
import EpoolProvider from '@theblock/lib-api/src/provider/epool';
import EtherscanProvider from '@theblock/lib-api/src/provider/etherscan';
import InfuraProvider from '@theblock/lib-api/src/provider/infura';
import EtherscanExplorer from '@theblock/lib-services/src/etherscan';
import GastrackerExplorer from '@theblock/lib-services/src/gastracker';
import { getStorage, setStorage } from '@theblock/lib-util/src/storage';
import ImgToken from '@theblock/lib-ui/src/img/token';
import SelectStore from '@theblock/lib-ui/src/input/select/store';

type ExplorerType = {
  api: ExplorerInterface,
  name: string,
  url: string
};

type ProviderType = Class<ProviderInterface>; // eslint-disable-line no-undef

type ChainType = {
  chainId: number,
  icon: React.Element<any>,
  name: string,
  explorer: ExplorerType,
  providers: Array<ProviderType>,
  token: string,
  tokenName?: string,
}

export type SelectChainType = SelectableInterface & ChainType & {
  api: Api,
  chainId: number,
  token: string
}

type ChainDefaultType = StorageValueType & {
  selectedKey: string;
};

const LS_DEFAULT: StorageNameType = 'chainDefault';
const CHAINS: Array<ChainType> = [
  {
    chainId: 1,
    icon: <ImgToken value='eth' />,
    name: 'Ethereum',
    token: 'ETH',
    tokenName: 'Ethereum',
    explorer: {
      api: new EtherscanExplorer('', 'api'),
      name: 'Etherscan.io',
      url: 'http://etherscan.io'
    },
    providers: [
      InfuraProvider,
      EtherscanProvider
    ]
  },
  {
    chainId: 61,
    icon: <ImgToken value='etc' />,
    name: 'Classic',
    token: 'ETC',
    tokenName: 'Classic',
    explorer: {
      api: new GastrackerExplorer(),
      name: 'Gastracker.io',
      url: 'https://gastracker.io'
    },
    providers: [
      EpoolProvider
    ]
  },
  {
    chainId: 42,
    icon: <ImgToken value='eth' />,
    name: 'Kovan (test)',
    token: 'ETH',
    tokenName: 'Ethereum',
    explorer: {
      api: new EtherscanExplorer('kovan'),
      name: 'Etherscan.io',
      url: 'http://kovan.etherscan.io'
    },
    providers: [
      InfuraProvider,
      EtherscanProvider
    ]
  }
];

const chains: Array<SelectChainType> = compact(flatten(
  CHAINS.map((chain: ChainType) => {
    return chain.providers.filter((Provider, index: number) => index === 0).map((Provider: ProviderType, index: number) => {
      const provider: ProviderInterface = new Provider(chain.chainId, {});

      console.log(`Instantiated provider ${provider.name} for chainId ${chain.chainId}`);

      return {
        api: new Api(provider, true),
        chainId: chain.chainId,
        explorer: chain.explorer,
        hint: provider.name,
        icon: chain.icon,
        key: `${chain.chainId}:${index}`,
        label: chain.name,
        token: chain.token,
        tokenName: chain.tokenName || chain.name
      };
    });
  })
));

const chainDefault: ChainDefaultType = getStorage(LS_DEFAULT);

class ChainStore extends SelectStore<SelectChainType> {
  constructor () {
    super(chains, chainDefault.selectedKey);

    autorun(() => {
      setStorage(LS_DEFAULT, { selectedKey: this.selectedKey });
    });
  }
}

export default new ChainStore();
