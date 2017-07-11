// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

module.exports = {
  browser: true,
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '@theblock/(.*)': '<rootDir>/packages/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  verbose: true
};
