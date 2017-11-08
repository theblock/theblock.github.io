// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import flatten from 'lodash.flatten';
import { observable, computed } from 'mobx';

import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import ImgToken from '@theblock/lib-ui/src/img/token';
import SelectStore from '@theblock/lib-ui/src/input/select/store';
import { preloadImage } from '@theblock/lib-util/src/image';
import metaTokens from '@theblock/meta-contracts/src/tokens';

import chainStore, { type SelectChainType } from './chains';

type SelectableTokenType = SelectableInterface & {
  address?: string,
  chainId: number,
  decimals: number,
  token: string
};

const tokens: Array<SelectableTokenType> = [].concat(
  (chainStore.items.map(({ chainId, key, icon, token, tokenName }: SelectChainType) => {
    return {
      chainId,
      decimals: 18,
      icon,
      key,
      label: tokenName || '???',
      token
    };
  }): Array<SelectableTokenType>),
  (flatten(
    metaTokens.map(({ decimals, image, key, name, where }) => {
      const src: string = preloadImage(`/assets/tokens/${image || 'question-128.png'}`);

      return (where || []).map(({ address, chainId }) => {
        return {
          address,
          chainId,
          decimals,
          icon: <ImgToken src={ src } />,
          key: `${key}:${address}:${chainId}`,
          label: name,
          token: key
        };
      });
    })
  ): Array<SelectableTokenType>)
);

export class TokenStore extends SelectStore<SelectableTokenType> {
  @observable chains = chainStore;

  @computed get filtered (): Array<SelectableTokenType> {
    return this.items.filter(({ chainId }: SelectableTokenType) => chainId === this.chains.selected.chainId);
  }

  findByAddress = (address: string): ?SelectableTokenType => {
    const laddress = address.toLowerCase();

    return this.filtered.find(({ address }) => address && address.toLowerCase() === laddress);
  }
}

export default new TokenStore(tokens);
