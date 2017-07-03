// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import Abi from 'ethereumjs-abi';

import type { JsonAbiType } from 'theblock-meta-contracts/src/types';
import type { AbiMethodType } from '../types';

import { decodeData, encodeData } from './data';

export default class Contract {
  methods: Array<AbiMethodType> = [];

  constructor (json: Array<JsonAbiType>) {
    this.attachJson(json);
  }

  attachJson (json: Array<JsonAbiType>) {
    this.methods = json
      .filter((abi: JsonAbiType): boolean => abi.type === 'function')
      .map((abi: JsonAbiType): AbiMethodType => {
        const inputTypes: Array<string> = abi.inputs.map(({ type }) => type);
        const outputTypes: Array<string> = abi.outputs.map(({ type }) => type);
        const signature: string = `0x${Buffer.from(Abi.methodID(abi.name, inputTypes)).toString('hex')}`;

        return {
          abi,
          signature,
          decode: (data: string): Array<any> => {
            return decodeData(outputTypes, data);
          },
          encode: (params: Array<any>): string => {
            return encodeData(inputTypes, params, signature);
          }
        };
      });
  }

  findMethod (name: string): AbiMethodType {
    const method: ?AbiMethodType = this.methods.find(({ signature, abi }) => {
      return signature === name ||
        abi.name === name;
    });

    if (!method) {
      throw new Error(`Unable to find method ${name}`);
    }

    return method;
  }
}
