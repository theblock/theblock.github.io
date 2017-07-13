// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import ImgHash from '@theblock/lib-ui/src/img/hash';
import ImgPattern from '@theblock/lib-ui/src/img/pattern';
import Navigation from '@theblock/lib-ui/src/navigation';

import store from './store';
import styles from './settings.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Settings ({ className, t }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <Navigation />
      <main>
        <section className={ styles.patterns }>
          <ImgPattern
            className={ [styles.pattern, styles.selected].join(' ') }
            seed={ store.seed }
          >
            <ImgHash
              className={ styles.hash }
              seed={ store.seed }
            />
          </ImgPattern>
          {
            store.seeds.map((seed, index) => {
              const _onClick = () => store.setSeed(seed, index);

              return (
                <ImgPattern
                  className={ styles.pattern }
                  key={ seed }
                  onClick={ _onClick }
                  seed={ seed }
                >
                  <ImgHash
                    className={ styles.hash }
                    seed={ seed }
                  />
                </ImgPattern>
              );
            })
          }
        </section>
      </main>
    </div>
  );
}

export default translate(['settings'])(observer(Settings));
