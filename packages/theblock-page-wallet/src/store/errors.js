// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { action, observable } from 'mobx';

import type { ErrorType } from '@theblock/lib-ui/src/errors';
import { fromDecToHex } from '@theblock/lib-util/src/convert';

export class ErrorStore {
  @observable errors: Array<ErrorType> = [];

  nextId: number = 0;

  @action addError = (title: string, { message }: Error): string => {
    const id: string = fromDecToHex(++this.nextId);
    const onClose: () => void = () => {
      this.clearError(id);
    };

    this.errors = this.errors.concat([({
      id,
      message,
      onClose,
      title
    }: ErrorType)]);

    return id;
  }

  @action clearError = (removeId: string) => {
    this.errors = this.errors.filter(({ id }) => id !== removeId);
  }
}

export default new ErrorStore();
