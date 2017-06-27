// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action } from 'mobx';

import type { PrivateKeyType } from 'theblock-lib-util/src/types';

import AddressStore from '../addresses/address';

export default class AccountStore extends AddressStore {
  encryptedKey: PrivateKeyType;

  privateKey: ?Buffer = null;
  shouldStore: boolean = false;

  constructor (shouldStore: boolean, encryptedKey: PrivateKeyType, privateKey: ?Buffer) {
    super(encryptedKey.address || '', encryptedKey.name || '', 'account');

    this.encryptedKey = encryptedKey;
    this.privateKey = privateKey || null;
    this.shouldStore = shouldStore;
  }

  @action toggleAccountName = (onEditCallback?: (id: string) => void) => {
    this.encryptedKey.name = this.name;
    this.toggleAddressName(onEditCallback);
  }
}
