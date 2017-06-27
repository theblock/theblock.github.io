// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import Button from 'theblock-lib-ui/src/button';
import Select from 'theblock-lib-ui/src/input/select';

import Busy from './busy';
import Details from './details';
import Storage from './storage';
import store from './store';
import styles from './import.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Import ({ className, t }: PropTypes): React.Element<any> {
  return (
    <main
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <Busy store={ store } />
      <section>
        <Interpolate
          parent='div'
          i18nKey='details.text'
          selectType={
            <Select store={ store.storeType } />
          }
        />
        <Details store={ store } />
      </section>
      <section>
        <Interpolate
          parent='div'
          i18nKey='storage.text'
          selectStorage={
            <Select store={ store.storeStorage } />
          }
        />
        <Storage store={ store } />
      </section>
      <section>
        <Button
          isBusy={ store.isBusy }
          isDisabled={ store.hasError }
          label={
            store.isBusy
              ? t('buttons.create.busy')
              : t('buttons.create.label')
          }
          onClick={ store.create }
        />
      </section>
    </main>
  );
}

export default translate(['import'])(observer(Import));
