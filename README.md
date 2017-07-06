# theBlock.io

[![GPLv3](https://img.shields.io/badge/license-GPL%20v3-green.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![CircleCI](https://circleci.com/gh/theblock/theblock.github.io.svg?style=shield)](https://circleci.com/gh/theblock/theblock.github.io)
[![Coverage Status](https://coveralls.io/repos/github/theblock/theblock.github.io/badge.svg?branch=master)](https://coveralls.io/github/theblock/theblock.github.io?branch=master)
[![semistandard](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

## Overview

The full web application for [https://theblock.io](https://theblock.io), a client-side Ethereum wallet.

## Structure

Handled as a mono-repo, all library packages and pages are within the [packages/](packages/) folder structure.

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg)](https://david-dm.org/theblock/theblock.github.io) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg)](https://david-dm.org/theblock/theblock.github.io?type=dev) [package.json](package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-api)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-api) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-lib-api)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-lib-api) [packages/theblock-lib-api/package.json](packages/theblock-lib-api/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-ens)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-ens) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-lib-ens)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-lib-ens) [packages/theblock-lib-ens/package.json](packages/theblock-lib-ens/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-hw)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-hw) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-lib-hw)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-lib-hw) [packages/theblock-lib-hw/package.json](packages/theblock-lib-hw/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-services)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-services) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-lib-services)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-lib-services) [packages/theblock-lib-services/package.json](packages/theblock-lib-services/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-ui)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-ui) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-lib-ui)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-lib-ui) [packages/theblock-lib-ui/package.json](packages/theblock-lib-ui/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-lib-util)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-lib-util) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-lib-util)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-lib-util) [packages/theblock-lib-util/package.json](packages/theblock-lib-util/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-meta-contracts)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-meta-contracts) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-meta-contracts)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-meta-contracts) [packages/theblock-meta-contracts/package.json](packages/theblock-meta-contracts/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-404)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-404) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-page-404)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-page-404) [packages/theblock-page-404/package.json](packages/theblock-page-404/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-blog)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-blog) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-page-blog)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-page-blog) [packages/theblock-page-blog/package.json](packages/theblock-page-blog/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-home)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-home) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-page-home)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-page-home) [packages/theblock-page-home/package.json](packages/theblock-page-home/package.json)

[![David](https://david-dm.org/theblock/theblock.github.io/status.svg?path=packages/theblock-page-wallet)](https://david-dm.org/theblock/theblock.github.io?path=packages/theblock-page-wallet) [![David](https://david-dm.org/theblock/theblock.github.io/dev-status.svg?path=packages/theblock-page-wallet)](https://david-dm.org/theblock/theblock.github.io?type=dev&path=packages/theblock-page-wallet) [packages/theblock-page-wallet/package.json](packages/theblock-page-wallet/package.json)

_[GPLv3](LICENSE), Copyright (C) 2017, theBlock, [https://theblock.io](https://theblock.io)_
