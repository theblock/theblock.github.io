// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';

import transactions from '../store/transactions';
import Transaction from './transaction';
import styles from './transactions.scss';

type PropTypes = {
  className?: string
};

function Transactions ({ className }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      {
        transactions.all.map((item) => (
          <Transaction
            className={ styles.item }
            item={ item }
            key={ item.id }
          />
        ))
      }
    </div>
  );
}

export default observer(Transactions);
