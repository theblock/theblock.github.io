// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import moment from 'moment';
import React, { type Element } from 'react';
import { Interpolate, translate } from 'react-i18next';

import { ReceiveIcon, SendIcon } from '@theblock/lib-ui/src/icons';
import { formatFloat } from '@theblock/lib-util/src/format';

import chains from '../../store/chains';
import { getTxHashLink } from '../../util/links';
import styles from './transaction.scss';

type PropTypes = {
  address: string,
  transaction: any,
  t: (string) => string
};

function Transaction ({ address, t, transaction: { hash, to, from, timeStamp, value } }: PropTypes): Element<any> {
  const isSent: boolean = from === address;

  return (
    <tr className={ styles.root }>
      <td className={ styles.typeIcon }>
        {
          isSent
            ? <SendIcon />
            : <ReceiveIcon />
        }
      </td>
      <td className={ styles.value }>
        <Interpolate
          i18nKey={
            isSent
              ? 'transactions.sent'
              : 'transactions.received'
          }
          value={
            <span
              className={
                isSent
                  ? styles.sent
                  : styles.received
              }
            >
              { formatFloat(value, 18, 4) }
              { ' ' }
              { chains.selected.token }
            </span>
          }
        />
      </td>
      <td className={ styles.txHash }>
        { getTxHashLink(hash, true) }
      </td>
      <td className={ styles.timestamp }>
        { moment(timeStamp).fromNow() }
      </td>
    </tr>
  );
}

export default translate(['accounts'])(observer(Transaction));
