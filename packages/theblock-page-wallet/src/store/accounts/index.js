// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, autorun, computed } from 'mobx';

import type { PrivateKeyType, StorageValueType, TransactionType } from 'theblock-lib-util/src/types';

import { signLedgerTransaction } from 'theblock-lib-hw/src/ledger';
import { signTrezorTransaction } from 'theblock-lib-hw/src/trezor';
import SelectStore from 'theblock-lib-ui/src/input/select/store';
import { decryptPrivateKey } from 'theblock-lib-util/src/keys';
import { getStorage, setStorage } from 'theblock-lib-util/src/storage';
import { signTransaction } from 'theblock-lib-util/src/transaction';

import AccountStore from './account';

type AccountDefaultType = StorageValueType & {
  selectedKey: string;
};

type AccountListType = StorageValueType & {
  list: Array<PrivateKeyType>;
};

const LS_ACCOUNTS = 'accounts';
const LS_DEFAULT = 'accountDefault';

const defaultInfo: AccountDefaultType = getStorage(LS_DEFAULT);
const storedList: AccountListType = getStorage(LS_ACCOUNTS);

const accounts: Array<AccountStore> = (storedList.items || []).map((encryptedKey) => {
  return new AccountStore(true, encryptedKey);
});

class AccountsStore extends SelectStore<AccountStore> {
  constructor () {
    super(accounts, defaultInfo.selectedKey);

    autorun(() => {
      setStorage(LS_DEFAULT, {
        selectedKey: this.selectedKey
      });
    });
  }

  @computed get hasAccounts (): boolean {
    return this.items.length !== 0;
  }

  @action completedEdit = (itemKey: string) => {
    this._items = this.items.map((item) => item);
    this.storeItems();
  }

  @action addItem = (shouldStore: boolean, encryptedKey: PrivateKeyType, privateKey: ?Buffer) => {
    const newItem: AccountStore = new AccountStore(shouldStore, encryptedKey, privateKey);

    this._items = this._removeItem(newItem.key).concat([newItem]);

    this.selectFirst();
    this.storeItems();
  }

  @action removeItem = (removeKey: string) => {
    this._items = this._removeItem(removeKey);
    this.storeItems();
  }

  _removeItem = (removeKey: string) => {
    return this._items.filter(({ key }) => key !== removeKey);
  }

  @action selectFirst = () => {
    if (!this.selected.address) {
      this.selectItem((this.items[0] || {}).key);
    }
  }

  @action storeItems = () => {
    setStorage(LS_ACCOUNTS, {
      items: this.items
        .filter(({ shouldStore }) => shouldStore)
        .map(({ encryptedKey }) => encryptedKey)
    });
  }

  needsUnlocking = (address: ?string): boolean => {
    const account: AccountStore = this.find(address);

    return account.isHardware
      ? false
      : !account.privateKey;
  }

  find = (_address: ?string): AccountStore => {
    const address: string = (_address || '').toLowerCase().slice(-40);
    const item: AccountStore = this.items.find((account: AccountStore) => {
      if (account.encryptedKey && account.encryptedKey.address) {
        return account.encryptedKey.address.toLowerCase().slice(-40) === address;
      }

      return false;
    }) || new AccountStore(false, { address: '' });

    return item;
  }

  unlockAccount = (address: ?string, password: string): Promise<boolean> => {
    const account: AccountStore = this.find(address);

    return decryptPrivateKey(account.encryptedKey, password).then((privateKey: Buffer) => {
      account.privateKey = privateKey;

      return true;
    });
  }

  signTransaction = (address: ?string, tx: TransactionType): Promise<string> => {
    const account: AccountStore = this.find(address);

    if (account.isHardware) {
      switch (account.hardwareType) {
        case 'ledger':
          return signLedgerTransaction(tx);

        case 'trezor':
          return signTrezorTransaction(tx);

        default:
          throw new Error('Invalid hardware type for signing');
      }
    }

    return signTransaction(tx, account.privateKey);
  }

  isHardware = (address: ?string): boolean => {
    return this.find(address).isHardware;
  }
}

export default new AccountsStore();
