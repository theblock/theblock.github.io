// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import BN from 'bn.js';

import { fromBnToHex, fromHexToBn, fromStrToHex } from '@theblock/lib-util/src/convert';
import { formatAddress } from '@theblock/lib-util/src/format';

import type { ReceiptResultType, ReceiptOutputType, TxInputType, TxObjectType, TxOutputType, TxResultType } from './types';

const ZERO_BN: BN = new BN(0);

export function formatInputAddress (address: ?string): string {
  return formatAddress(address).toLowerCase();
}

export function formatInputTx (tx: TxObjectType): TxInputType {
  return {
    data: fromStrToHex(tx.data),
    from: tx.from
      ? formatInputAddress(tx.from)
      : null,
    gas: fromBnToHex(tx.gasLimit || ZERO_BN),
    gasPrice: fromBnToHex(tx.gasPrice || ZERO_BN),
    to: tx.to
      ? formatInputAddress(tx.to)
      : null,
    value: fromBnToHex(tx.value || ZERO_BN)
  };
}

export function formatOutputReceipt (receipt: ?ReceiptResultType): ?ReceiptOutputType {
  if (!receipt) {
    return null;
  }

  return {
    blockNumber: fromHexToBn(receipt.blockNumber),
    contractAddress: formatAddress(receipt.contractAddress),
    gasUsed: fromHexToBn(receipt.gasUsed)
  };
}

export function formatOutputTx (tx: ?TxResultType): ?TxOutputType {
  if (!tx) {
    return null;
  }

  return {
    blockNumber: fromHexToBn(tx.blockNumber),
    creates: formatAddress(tx.creates),
    data: tx.data,
    from: formatAddress(tx.from),
    gasLimit: fromHexToBn(tx.gas),
    gasPrice: fromHexToBn(tx.gasPrice),
    nonce: fromHexToBn(tx.nonce),
    to: formatAddress(tx.to),
    value: fromHexToBn(tx.value)
  };
}
