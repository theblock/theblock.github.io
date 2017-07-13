// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkgjson = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

const BLOG_ENTRIES = fs
  .readdirSync('packages/page-blog/i18n')
  .filter((file) => (/^20[0-9]{6}-[0-9]{4}$/).test(file)).sort().reverse();
const PAGES = ['404', 'blog', 'home', 'wallet'].concat(BLOG_ENTRIES.map((file) => `blog/${file}`));
const VERSION = isProduction
  ? pkgjson.version.split('.').map((v) => `000${v}`.slice(-3)).join('.')
  : 'development';
const HASH_PATH = `y/z/${VERSION}/[name]`; // [name]/[chunkhash] or [hash]/[name]

function resolve (modulePath) {
  return path.resolve(__dirname, modulePath);
}

module.exports = {
  output: {
    chunkFilename: `${HASH_PATH}.js`,
    filename: `${HASH_PATH}.js`,
    path: path.join(__dirname, 'x'),
    publicPath: `/x/`
  },
  devServer: {
    quiet: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  devtool: 'source-map',
  entry: PAGES.reduce(
    (result, page) => Object.assign(result, {
      [page]: `./src/${page}.js`
    }), {
      'ethereum': [
        'blockies', 'bn.js', 'ethereumjs-abi', 'ethereumjs-tx', 'ethereumjs-util', 'keccak', 'keythereum', 'secp256k1'
      ],
      'vendor': [
        'bip39', 'bip66', 'bitcoinjs-lib', 'ledgerco', 'trezor-connect', 'u2f-api'
      ]
    }
  ),
  resolve: {
    alias: Object
      .keys(pkgjson.dependencies)
      .filter((module) => /^@theblock\//.test(module))
      .map((module) => module.replace('@theblock', ''))
      .reduce((result, module) => {
        result[module] = resolve(`packages/${module}`);
        return result;
      }, {
        'ethereumjs-tx': resolve('node_modules/ethereumjs-tx/index.js'),
        'ethereumjs-util': resolve('node_modules/ethereumjs-util/index.js'),
        'keccak/js': resolve('node_modules/keccak/js'),
        'keccak': resolve('node_modules/keccak/js'),
        'ledgerco': resolve('node_modules/ledgerco/src/index-browserify.js'),
        'secp256k1/elliptic': resolve('node_modules/secp256k1/elliptic'),
        'secp256k1': resolve('node_modules/secp256k1/elliptic'),
        'u2f-api': resolve('node_modules/ledgerco/src/u2f-api.js')
      }),
    descriptionFiles: [
      'package.json'
    ],
    mainFields: [
      'jsnext:main',
      'browser',
      'main'
    ],
    modules: [
      'node_modules'
    ]
  },
  externals: {
    i18next: 'i18next',
    mobx: 'mobx',
    'mobx-react': 'mobxReact',
    'moment': 'moment',
    'normalize.css': 'normalize',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/(ethereumjs-tx|idna-uts46)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-runtime'
            ],
            presets: [
              'es2015'
            ]
          }
        }
      },
      {
        test: /worker\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'worker-loader',
            options: {
              name: `${HASH_PATH}.[hash].js`
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base36:6]',
                minimize: true,
                modules: true
              }
            },
            'postcss-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [].concat(
    [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        BLOG_ENTRIES: BLOG_ENTRIES.join(',')
      }),
      isProduction && new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: (module, count) => {
          const isMarkdown = /^.*\.md$/.test(module.resource);
          const isPopular = count >= 2;

          return isPopular && !isMarkdown;
        },
        name: 'common',
        chunks: PAGES
      }),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: [
          'ethereum',
          'vendor',
          'manifest'
        ]
      }),
      isProduction && new webpack.optimize.ModuleConcatenationPlugin(),
      !isProduction && new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8088,
        reportFilename: 'report.html',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json'
      }),
      new ExtractTextPlugin({
        filename: `${HASH_PATH}.css`
      }),
      isProduction && new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      })
    ],
    PAGES.map((page) => new HtmlPlugin({
      chunks: [
        'common',
        'ethereum',
        'vendor',
        'manifest',
        page
      ],
      filename: `${page}/index.html`,
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true
      },
      template: './index.ejs',
      title: page
    })),
    [
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ]
  ).filter((plugin) => plugin)
};
