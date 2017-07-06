# theBlock.io

[![GPLv3](https://img.shields.io/badge/license-GPL%20v3-green.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![semistandard](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

[![CircleCI](https://circleci.com/gh/theblock/theblock.github.io.svg?style=shield)](https://circleci.com/gh/theblock/theblock.github.io)
[![Coverage Status](https://coveralls.io/repos/github/theblock/theblock.github.io/badge.svg?branch=master)](https://coveralls.io/github/theblock/theblock.github.io?branch=master)
[![Code Climate](https://codeclimate.com/github/theblock/theblock.github.io/badges/gpa.svg)](https://codeclimate.com/github/theblock/theblock.github.io)
[![David](https://david-dm.org/theblock/theblock.github.io/status.svg)](https://david-dm.org/theblock/theblock.github.io)
[![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg)](https://david-dm.org/theblock/theblock.github.io?type=dev)

## Overview

The full web application for [https://theblock.io](https://theblock.io), a client-side Ethereum wallet.

## Structure

Handled as a mono-repo, all library packages and pages are within the [packages/](packages/) folder structure.

|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dependencies&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Link|Description|
|:--:|:--:|:--|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/lib-api)](https://david-dm.org/theblock/theblock.github.io?path=packages/lib-api)|[lib&#x2011;api](packages/lib-api)|The API layer used in Ethereum-based pages, e.g. the wallet. A think JSONRPC wrapper, exposing only the calls used, along with helpers such as retrieving token balances.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/lib-ens)](https://david-dm.org/theblock/theblock.github.io?path=packages/lib-ens)|[lib&#x2011;ens](packages/lib-ens)|An interface to the Ethereum Name Service, providing lookups of names against the registry and associated resolvers.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/lib-hardware)](https://david-dm.org/theblock/theblock.github.io?path=packages/lib-hardware)|[lib&#x2011;hardware](packages/lib-hardware)|Interfaces to popular hardware wallets, e.g. Ledger and Trezor|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/lib-services)](https://david-dm.org/theblock/theblock.github.io?path=packages/lib-services)|[lib&#x2011;services](packages/lib-services)|Interfaces to 3rd party services such as Cryptocompare, Etherscan, Fourbyte.directory, Gastracker (Classic-only).|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/lib-ui)](https://david-dm.org/theblock/theblock.github.io?path=packages/lib-ui)|[lib&#x2011;ui](packages/lib-ui)|A library of home-rolled UI components used in all pages. Provides all the basics such as inputs, buttons along with a consistent style.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/lib-util)](https://david-dm.org/theblock/theblock.github.io?path=packages/lib-util)|[lib&#x2011;util](packages/lib-util)|Various utility function inclusive of converters, formatters and type validation.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/meta-contracts)](https://david-dm.org/theblock/theblock.github.io?path=packages/meta-contracts)|[meta&#x2011;contracts](packages/meta-contracts)|Definitions for contracts and tokens that have been deployed on various networks.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/page-404)](https://david-dm.org/theblock/theblock.github.io?path=packages/page-404)|[page&#x2011;404](packages/page-404)|The 404 page.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/page-blog)](https://david-dm.org/theblock/theblock.github.io?path=packages/page-blog)|[page&#x2011;blog](packages/page-blog)|The blog and all blog entries.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/page-home)](https://david-dm.org/theblock/theblock.github.io?path=packages/page-home)|[page&#x2011;home](packages/page-home)|The main landing page.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/page-talk)](https://david-dm.org/theblock/theblock.github.io?path=packages/page-talk)|[page&#x2011;talk](packages/page-talk)|A simple chat interface built on Ethereum Whisper.|
|[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/page-wallet)](https://david-dm.org/theblock/theblock.github.io?path=packages/page-wallet)|[page&#x2011;wallet](packages/page-wallet)|Where all the Wallet magic happens. A basic Ethereum wallet that includes account management, account details and transactions.|

_[GPLv3](LICENSE), Copyright (C) 2017, theBlock, [https://theblock.io](https://theblock.io)_
