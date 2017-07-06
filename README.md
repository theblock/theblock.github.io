# theBlock.io

[![GPLv3](https://img.shields.io/badge/license-GPL%20v3-green.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![CircleCI](https://circleci.com/gh/theblock/theblock.github.io.svg?style=shield)](https://circleci.com/gh/theblock/theblock.github.io)
[![Coverage Status](https://coveralls.io/repos/github/theblock/theblock.github.io/badge.svg?branch=master)](https://coveralls.io/github/theblock/theblock.github.io?branch=master) [![David](https://david-dm.org/theblock/theblock.github.io/status.svg)](https://david-dm.org/theblock/theblock.github.io) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg)](https://david-dm.org/theblock/theblock.github.io?type=dev) [![semistandard](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

## Overview

The full web application for [https://theblock.io](https://theblock.io), a client-side Ethereum wallet.

## Structure

Handled as a mono-repo, all library packages and pages are within the [packages/](packages/) folder structure.

|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dependencies&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Link|Description|
|:--:|:--:|:--|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-api)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-api)|[theblock&#x2011;lib&#x2011;api](packages/theblock-lib-api)|The API layer used in Ethereum-based pages, e.g. the wallet. A think JSONRPC wrapper, exposing only the calls used, along with helpers such as retrieving token balances.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-ens)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-ens)|[theblock&#x2011;lib&#x2011;ens](packages/theblock-lib-ens)|An interface to the Ethereum Name Service, providing lookups of names against the registry and associated resolvers.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-hw)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-hw)|[theblock&#x2011;lib&#x2011;hw](packages/theblock-lib-hw)|Interfaces to popular hardware wallets, e.g. Ledger and Trezor|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-services)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-services)|[theblock&#x2011;lib&#x2011;services](packages/theblock-lib-services)|Interfaces to 3rd party services such as Cryptocompare, Etherscan, Fourbyte.directory, Gastracker (Classic-only).|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-ui)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-ui)|[theblock&#x2011;lib&#x2011;ui](packages/theblock-lib-ui)|A library of home-rolled UI components used in all pages. Provides all the basics such as inputs, buttons along with a consistent style.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-util)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-util)|[theblock&#x2011;lib&#x2011;util](packages/theblock-lib-util)|Various utility function inclusive of converters, formatters and type validation.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-meta-contracts)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-meta-contracts)|[theblock&#x2011;meta&#x2011;contracts](packages/theblock-meta-contracts)|Definitions for contracts and tokens that have been deployed on various networks.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-404)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-404)|[theblock&#x2011;page&#x2011;404](packages/theblock-page-404)|The 404 page.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-blog)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-blog)|[theblock&#x2011;page&#x2011;blog](packages/theblock-page-blog)|The blog and all blog entries.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-home)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-home)|[theblock&#x2011;page&#x2011;home](packages/theblock-page-home)|The main landing page.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-wallet)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-wallet)|[theblock&#x2011;page&#x2011;wallet](packages/theblock-page-wallet)|Where all the Wallet magic happens. A basic Ethereum wallet that includes account management, account details and transactions.|

_[GPLv3](LICENSE), Copyright (C) 2017, theBlock, [https://theblock.io](https://theblock.io)_
