// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import InputStatic from 'theblock-lib-ui/src/input/static';
import Select from 'theblock-lib-ui/src/input/select';

import chains from '../store/chains';
import currencyStore from '../store/currencies';
import tokenStore from '../store/tokens';
import InputName from './inputName';
import Transaction from './transaction';
import store from './store';
import styles from './accounts.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Accounts ({ className, t }: PropTypes): React.Element<any> {
  return (
    <main
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <section>
        <Interpolate
          i18nKey='accounts:address.text'
          parent='div'
          account={
            <Select
              displayKey
              copyValue={ store.accounts.selected.key }
              store={ store.accounts }
            />
          }
        />
        <Interpolate
          i18nKey='accounts:name.text'
          parent='div'
          name={
            <InputName
              account={ store.accounts.selected }
              onEditDone={ store.accounts.completedEdit }
            />
          }
        />
        <Interpolate
          i18nKey='accounts:balance.text'
          parent='div'
          balance={
            <span>
              <InputStatic value={ store.balance.balanceFormatted } />
              <Select store={ tokenStore } />
            </span>
          }
          fiat={
            <span>
              <InputStatic value={ store.balance.balanceFiatFormatted } />
              <Select store={ currencyStore } />
            </span>
          }
        />
      </section>
      {
        store.hasTransactions
          ? (
            <section>
              <table>
                {
                  store.transactions.map((transaction) => (
                    <Transaction
                      address={ store.accounts.selected.key }
                      key={ transaction.hash }
                      transaction={ transaction }
                    />
                  ))
                }
                <tr>
                  <td
                    className={ styles.powered }
                    colSpan='4'
                  >
                    <Interpolate
                      i18nKey='transactions.powered'
                      explorer={
                        <a
                          href={ chains.selected.explorer.url }
                          rel='noopener'
                          target='_blank'
                        >
                          { chains.selected.explorer.name }
                        </a>
                      }
                    />
                  </td>
                </tr>
              </table>
            </section>
          )
          : null
      }
    </main>
  );
}

export default translate(['accounts'])(observer(Accounts));