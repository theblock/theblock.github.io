// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-for'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-calc'),
    require('postcss-strip-inline-comments'),
    require('postcss-discard-comments')
  ],
  syntax: require('postcss-scss')
};
