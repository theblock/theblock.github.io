// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export default {
  popup: {
    completed: {
      title: 'Completed',
      text: 'Account {{addressDetails}} has been created'
    },
    busy: {
      title: 'Creating',
      text: 'Busy creating account from the specified details'
    }
  },
  errors: {
    importFail: 'Import error',
    ledgerComms: 'Unable to communicate with your Ledger. Make sure it is available, has the Ethereum application open and is set to browser mode',
    trezorComms: 'Unable to communicate with your Trezor. Make sure it is available'
  },
  details: {
    text: 'add account from'
  },
  password: {
    text: 'encrypted with password'
  },
  keytype: {
    bipPhrase: {
      label: 'Mnemonic phrase',
      example: 'e.g. seed sock milk update focus rotate barely fade car face mechanic mercy',
      text: 'with the phrase'
    },
    brainPhrase: {
      label: 'Parity phrase',
      example: 'e.g. neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
      text: 'with the phrase'
    },
    json: {
      label: 'Keystore file',
      file: {
        text: 'from the source file'
      }
    },
    ledger: {
      label: 'Ledger wallet'
    },
    new: {
      label: 'New generated key'
    },
    privateKey: {
      label: 'Private key',
      example: 'e.g. 0x123456789deadbeef9876543210123456789deadbeef',
      text: 'with the key'
    },
    trezor: {
      label: 'Trezor wallet'
    }
  },
  path: {
    text: 'from path compatible with',
    type: {
      ledger: {
        label: 'Ledger'
      },
      trezor: {
        label: 'Trezor'
      }
    }
  },
  storage: {
    text: 'store my account in'
  },
  storagetype: {
    browser: {
      label: 'browser storage'
    },
    session: {
      label: 'session memory'
    }
  },
  buttons: {
    create: {
      label: 'I want to create this account',
      busy: 'Creating account'
    }
  },
  help: {
    hardware: 'Connect your hardware device to retrieve the available accounts before attempting the import.',
    password: 'Select a strong password to encrypt your account. Any unauhorised access to your keyfile with a weak password may result in a loss of funds.',
    storage: 'Accounts stored in session will not be available after a browser refresh. Accounts in bowser storage will be and should your machine be compromised, password encrypted keyfiles can be extracted.'
  }
};
