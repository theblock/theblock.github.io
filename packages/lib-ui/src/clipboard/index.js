// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { PureComponent } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { ClipboardIcon } from '../icons';
import Tooltip from '../tooltip';

import styles from './clipboard.scss';

type StateType = {
  fade: boolean
};

export default class Clipboard extends PureComponent<any, StateType> {
  props: {
    className?: string,
    value: string
  };

  state = ({
    fade: false
  }: StateType);

  render () {
    const { value, className } = this.props;

    return (
      <Tooltip value={ value }>
        <CopyToClipboard
          className={
            compact([
              styles.ui,
              this.state.fade
                ? styles.fade
                : '',
              className
            ]).join(' ')
          }
          onCopy={ this.onCopy }
          text={ value }
        >
          <ClipboardIcon />
        </CopyToClipboard>
      </Tooltip>
    );
  }

  onCopy = () => {
    this.setState(({ fade: true }: StateType), () => {
      setTimeout(() => {
        this.setState(({ fade: false }: StateType));
      }, 1000);
    });
  }
}
