// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, observable } from 'mobx';
import React, { type Element } from 'react';

import type { SelectableInterface } from '@theblock/lib-ui/src/types';

import ImgIdentity from '@theblock/lib-ui/src/img/identity';
import { formatAddress } from '@theblock/lib-util/src/format';

type AddressType = 'account' | 'address';

export default class AddressStore implements SelectableInterface {
  @observable addressType: AddressType = 'address';
  @observable hint: ?string = '';
  @observable icon: ?Element<any> = null;
  @observable key: string = '';
  @observable label: ?string = '';
  @observable name: string = '';

  constructor (_address: string, name: string, addressType?: AddressType) {
    const address: string = formatAddress(_address);

    this.addressType = addressType || 'address';
    this.hint = address;
    this.icon = <ImgIdentity value={ address } />;
    this.key = address;
    this.name = name;
    this.label = name || address;
  }

  @action toggleAddressName = (onEditCallback?: (id: string) => void) => {
    this.label = this.name || this.key;

    onEditCallback && onEditCallback(this.key);
  }

  @action setName = (name: string) => {
    this.name = name;
  }
}
