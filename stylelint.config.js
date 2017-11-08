// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': [
        'define-mixin',
        'for',
        'mixin'
      ]
    }],
    'block-no-empty': null,
    'no-invalid-double-slash-comments': null
  }
};
