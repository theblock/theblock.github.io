// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import Field from '@theblock/lib-ui/src/field';
import Form from '@theblock/lib-ui/src/form';
import Language from '@theblock/lib-ui/src/language';
import ImgPattern from '@theblock/lib-ui/src/img/pattern';
import Select from '@theblock/lib-ui/src/input/select';

import chains from '../store/chains';
import store from './store';
import styles from './settings.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Settings ({ className, t }: PropTypes): React.Element<any> {
  return (
    <main
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <section>
        <Form>
          <div>
            <Field>
              <Interpolate
                i18nKey='language.text'
                parent='div'
              />
              <div>
                <Language />
              </div>
            </Field>
            <Field>
              <Interpolate
                i18nKey='chain.text'
                parent='div'
              />
              <div>
                <Select store={ chains } />
              </div>
            </Field>
          </div>
        </Form>
      </section>
      <section className={ styles.patterns }>
        <ImgPattern
          className={ [styles.pattern, styles.selected].join(' ') }
          seed={ store.seed }
        />
        {
          store.seeds.map((seed, index) => {
            const _onClick = () => store.setSeed(seed, index);

            return (
              <ImgPattern
                className={ styles.pattern }
                key={ seed }
                onClick={ _onClick }
                seed={ seed }
              />
            );
          })
        }
      </section>
    </main>
  );
}

export default translate(['settings'])(observer(Settings));
