// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import type { PopupColorType } from 'theblock-lib-ui/src/infoPopup/types';
import type { TxStateType } from '../../store/transactions/types';

import InfoPopup from 'theblock-lib-ui/src/infoPopup';

import TransactionType from '../../store/transactions/transaction';

import Info from './info';
import Status from './status';

type PropTypes = {
  className?: string,
  item: TransactionType,
  t: (string) => string
};

const colors: { [TxStateType]: PopupColorType } = {
  'completed': 'green',
  'error': 'red',
  'rejected': 'red'
};

function Transaction ({ className, item, t }: PropTypes): ?React.Element<any> {
  if (!item.isVisible) {
    return null;
  }

  return (
    <InfoPopup
      color={ colors[item.state] || 'orange' }
      onClose={
        item.state === 'queued'
          ? item.reject
          : item.close
      }
      title={ t(`title.${item.state}`) }
    >
      <Info item={ item } />
      <Status item={ item } />
    </InfoPopup>
  );
}

export default translate(['tx'])(observer(Transaction));
