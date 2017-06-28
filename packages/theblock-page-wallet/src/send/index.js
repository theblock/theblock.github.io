// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import Button from 'theblock-lib-ui/src/button';
import InputAddress from 'theblock-lib-ui/src/input/address';
import InputHex from 'theblock-lib-ui/src/input/hex';
import InputNumber from 'theblock-lib-ui/src/input/number';
import InputStatic from 'theblock-lib-ui/src/input/static';
import Select from 'theblock-lib-ui/src/input/select';

import accounts from '../store/accounts';
import addresses from '../store/addresses';
import store from './store';
import styles from './send.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Send ({ className, t }: PropTypes): React.Element<any> {
  return (
    <main
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <section>
        <div>
          <Interpolate
            i18nKey='account.text'
            account={
              <Select store={ accounts } />
            }
          />
          { ' ' }
          <Interpolate
            i18nKey='token.text'
            token={
              <Select store={ store.tokens } />
            }
          />
        </div>
      </section>
      <section>
        <Interpolate
          i18nKey='balance.text'
          parent='div'
          balance={
            <span>
              <InputStatic
                value={
                  store.valueType.selected.isNative
                    ? store.balance.balanceFormatted
                    : store.balance.balanceFiatFormatted
                }
              />
              <Select store={ store.valueType } />
            </span>
          }
        />
        <Interpolate
          i18nKey='value.text'
          parent='div'
          value={
            <span>
              <InputNumber
                onChange={
                  store.valueType.selected.isNative
                    ? store.setTxValue
                    : store.setTxValueFiat
                }
                isWarning={ store.txValueBn.isZero() }
                step={ 0.001 }
                value={
                  store.valueType.selected.isNative
                    ? store.txValue
                    : store.txValueFiat
                }
                valueDisplay={
                  (
                    store.valueType.selected.isNative
                      ? store.txValueFormatted
                      : store.txValueFiatFormatted
                  ) || t('value.empty')
                }
              />
              <InputStatic value={ store.valueType.selected.key } />
            </span>
          }
        />
        <Interpolate
          i18nKey='recipient.text'
          parent='div'
          recipient={
            <InputAddress
              example={ t('recipient.example') }
              isError={ store.hasRecipientError }
              isMaxWidth
              onChange={ store.setRecipient }
              store={ addresses }
              value={ store.recipient }
            />
          }
        />
      </section>
      <section>
        <Interpolate
          i18nKey='data.text'
          data={
            <InputHex
              example={ t('data.example') }
              isError={ store.hasTxDataError }
              onChange={ store.setTxData }
              value={ store.txData }
              valueDisplay={ store.txDataFormatted || t('data.empty') }
            />
          }
        />
        { ' ' }
        <Interpolate
          i18nKey='gasLimit.text'
          gasLimit={
            <InputNumber
              onChange={ store.setGasLimit }
              step={ 21000 }
              value={ store.gasLimit }
              valueDisplay={ store.gasLimitFormatted || t('gasLimit.empty') }
            />
          }
        />
        { ' ' }
        <Interpolate
          i18nKey='gasPrice.text'
          gasPrice={
            <InputNumber
              onChange={ store.setGasPrice }
              step={ 10.0 }
              value={ store.gasPrice }
              valueDisplay={ store.gasPriceFormatted || t('gasPrice.empty') }
            />
          }
        />
      </section>
      <section>
        <Button
          isBusy={ store.isBusySending }
          isDisabled={ store.hasError }
          label={
            store.isBusySending
              ? t('buttons.send.busy')
              : t('buttons.send.label')
          }
          onClick={ store.send }
        />
      </section>
    </main>
  );
}

export default translate(['send'])(observer(Send));
