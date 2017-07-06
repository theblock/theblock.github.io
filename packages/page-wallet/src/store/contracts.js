// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import type { ContractLocationType, ContractType } from '@theblock/meta-contracts/src/types';
import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import metaContracts from '@theblock/meta-contracts/src/contracts';
import ImgToken from '@theblock/lib-ui/src/img/token';
import { preloadImage } from '@theblock/lib-util/src/image';

type SelectableContractType = SelectableInterface & {
  where: Array<ContractLocationType>
};

const contracts: Array<SelectableContractType> = metaContracts.map(({ key, name, image, where }: ContractType) => {
  const src: string = preloadImage(`/assets/contracts/${image || ''}`);

  return {
    key,
    label: name,
    icon: <ImgToken src={ src } />,
    where
  };
});

export default contracts;
