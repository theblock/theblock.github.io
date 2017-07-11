// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import createKeccakHash from 'keccak';

export function createSha3Buffer (value: Buffer | string): Buffer {
  return createKeccakHash('keccak256').update(value).digest();
}

export function createSha3Raw (value: Buffer | string): string {
  return createSha3Buffer(value).toString('hex');
}

export function createSha3 (value: Buffer | string): string {
  return `0x${createSha3Raw(value)}`;
}
