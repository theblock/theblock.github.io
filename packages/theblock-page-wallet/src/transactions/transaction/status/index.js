// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import Button from 'theblock-lib-ui/src/button';
import InputPassword from 'theblock-lib-ui/src/input/password';

import TransactionType from '../../../store/transactions/transaction';
import { getBlockNumberLink, getTxHashLink } from '../../../util/links';

import styles from './status.scss';

type PropTypes = {
  className?: string,
  item: TransactionType,
  t: (string) => string
};

function Status ({ className, item, t }: PropTypes): ?React.Element<any> {
  switch (item.state) {
    case 'completed':
      return (
        <Interpolate
          parent='section'
          i18nKey='state.completed'
          blockNumber={ getBlockNumberLink(item.receiptBlockNumber) }
          txHash={ getTxHashLink(item.txHash, true) }
        />
      );

    case 'propagating':
      return (
        <Interpolate
          parent='section'
          i18nKey='state.propagating'
          txHash={ getTxHashLink(item.txHash, true) }
        />
      );

    case 'error':
      return (
        <section>
          { item.error }
        </section>
      );

    case 'queued':
      return (
        <div>
          {
            item.needsUnlocking
              ? (
                <Interpolate
                  parent='section'
                  i18nKey='confirmPassword'
                  inputPassword={
                    <InputPassword
                      isError={ !item.hasPassword }
                      onChange={ item.setPassword }
                      value={ item.password }
                    />
                  }
                />
              )
              : null
          }
          <footer>
            <Button
              label={ t('buttons.confirm') }
              onClick={ item.confirm }
            />
            <Button
              isDanger
              label={ t('buttons.reject') }
              onClick={ item.reject }
            />
          </footer>
        </div>
      );

    case 'confirming':
    case 'decrypting':
    case 'nonce':
    case 'rejected':
    case 'sending':
    case 'signing':
    case 'signingHardware':
      return (
        <section>
          <div className={ styles.text }>
            { t(`state.${item.state}`) }
          </div>
        </section>
      );

    default:
      console.error('Unhandled transaction state', item.state);
      return null;
  }
}

export default translate(['tx'])(observer(Status));
