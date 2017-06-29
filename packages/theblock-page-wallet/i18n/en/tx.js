// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

export default {
  confirmTx: 'Sending from {{txFrom}} to {{txTo}} with {{txValue}} value and {{txData}} extra data. Gas limit of {{txGasLimit}} and {{txGasPrice}} Gwei/gas price for a {{txTotal}} overall total',
  confirmValueNone: 'no',
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
    nonce: 'Caclculating transcation nonce',
    propagating: 'The transaction {{txHash}} is waiting to be mined',
    queued: 'You are about to send, please enter your account password',
    rejected: 'Your transaction has been rejected and will not be posted',
    sending: 'Your transaction is being sent to the node',
    signing: 'Signing transaction using private key',
    signningHardware: 'Requesting signing and confirmation from hardware device'
  }
};
