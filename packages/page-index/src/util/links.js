// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React, { type Element } from 'react';

import ImgIdentity from '@theblock/lib-ui/src/img/identity';
import InputLink from '@theblock/lib-ui/src/input/link';

import chains from '../store/chains';

function createLinkElement (href: string, value?: string, icon?: ?Element<any>, withCopy?: boolean): Element<any> {
  return (
    <InputLink
      copyValue={
        withCopy
          ? value
          : null
      }
      href={ href }
      icon={ icon }
      isMedWidth
      value={ value }
    />
  );
}

export function getAccountLink (address?: string): Element<any> {
  return createLinkElement(
    chains.selected.explorer.api.linkAddress(address || '0x'),
    address,
    <ImgIdentity value={ address } />
  );
}

export function getBlockNumberLink (blockNumber?: string): Element<any> {
  return createLinkElement(
    chains.selected.explorer.api.linkBlockNumber(blockNumber || '0'),
    blockNumber
  );
}

export function getTxHashLink (txHash?: string, withCopy?: boolean): Element<any> {
  return createLinkElement(
    chains.selected.explorer.api.linkTransaction(txHash || ''),
    txHash,
    null,
    withCopy
  );
}
