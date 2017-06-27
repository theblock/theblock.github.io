// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

module.exports = {
  extends: ['semistandard'],
  plugins: ['react'],
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'jest': true
  },
  globals: {
    'expect': true
  },
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'curly': ['error', 'all'],
    'jsx-quotes': ['error', 'prefer-single'],
    'newline-after-var': ['error', 'always'],
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-duplicate-imports': ['error', {
      'includeExports': true
    }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 0,
    'one-var-declaration-per-line': ['error', 'always'],
    'padded-blocks': ['error', {
      'blocks': 'never',
      'classes': 'never',
      'switches': 'never'
    }],
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-prop-types': 'error'
  }
};
