// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export default {
  confirmTx: '{{txData}} extra data with gas limit of {{txGasLimit}} and {{txGasPrice}} Gwei/gas price, overall total of {{txTotal}}',
  confirmDataNone: 'no',
  confirmPassword: 'Unlock my account with {{inputPassword}}',
  buttons: {
    confirm: 'Confirm, sign and send',
    reject: 'No, reject'
  },
  errors: {
    decrypt: 'Unable to decrypt key using supplied password: {{message}}',
    nonce: 'Unable to determine nonce: {{message}}',
    sendRaw: 'Unable to send transaction: {{message}}',
    sign: 'Unable to sign transaction: {{message}}'
  },
  fields: {
    password: {
      hint: 'account password',
      label: 'Password'
    }
  },
  title: {
    confirming: 'Confirming credentials',
    completed: 'Completed',
    decrypting: 'Decrypting account',
    nonce: 'Transaction nonce',
    propagating: 'Propagating',
    queued: 'Transaction confirmation',
    rejected: 'Transaction rejected',
    error: 'Error',
    sending: 'Sending',
    signing: 'Signing',
    signingHardware: 'Signing'
  },
  state: {
    completed: 'Your transaction {{txHash}} was accepted in block {{blockNumber}}',
    confirming: 'Confirming transaction with supplied credentials',
    decrypting: 'Decrypting your account with the supplied credentials',
    nonce: 'Retrieving the transaction nonce',
    propagating: 'The transaction {{txHash}} is waiting to be mined',
    queued: 'You are about to send, please enter your account password',
    rejected: 'Your transaction has been rejected and will not be posted',
    sending: 'Your transaction is being sent to the node',
    signing: 'Signing transaction using private key',
    signingHardware: 'Requesting signing and confirmation from hardware device'
  }
};
