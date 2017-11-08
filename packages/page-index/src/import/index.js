// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React, { type Element } from 'react';
import { Interpolate, translate } from 'react-i18next';

import Button from '@theblock/lib-ui/src/button';
import Field from '@theblock/lib-ui/src/field';
import Form from '@theblock/lib-ui/src/form';
import InputPassword from '@theblock/lib-ui/src/input/password';
import Select from '@theblock/lib-ui/src/input/select';

import Busy from './busy';
import Details from './details';
import store from './store';
import styles from './import.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Import ({ className, t }: PropTypes): Element<any> {
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
        <Form>
          <div>
            <Field>
              <Interpolate
                parent='div'
                i18nKey='details.text'
              />
              <div>
                <Select store={ store.storeType } />
              </div>
            </Field>
            <Details store={ store } />
            {
              store.shouldShowPath
                ? (
                  <Field>
                    <Interpolate
                      parent='div'
                      i18nKey='path.text'
                    />
                    <div>
                      <Select store={ store.storePath } />
                    </div>
                  </Field>
                )
                : null
            }
            {
              store.shouldShowPassword
                ? (
                  <Field>
                    <Interpolate
                      parent='div'
                      i18nKey='password.text'
                    />
                    <div>
                      <InputPassword
                        isWarning={ store.hasEmptyPassword }
                        onChange={ store.setPassword }
                        value={ store.password }
                      />
                    </div>
                  </Field>
                )
                : null
            }
            <Field>
              <Interpolate
                parent='div'
                i18nKey='storage.text'
              />
              <div>
                <Select store={ store.storeStorage } />
              </div>
            </Field>
          </div>
          <aside>
            {
              store.shouldShowPassword
                ? (
                  <Interpolate
                    parent='div'
                    i18nKey='help.password'
                  />
                )
                : null
            }
            {
              store.isHardware
                ? (
                  <Interpolate
                    parent='div'
                    i18nKey='help.hardware'
                  />
                )
                : null
            }
            <Interpolate
              parent='div'
              i18nKey='help.storage'
            />
          </aside>
        </Form>
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
