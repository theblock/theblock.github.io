// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { translate } from 'react-i18next';

import Footer from '@theblock/lib-ui/src/footer';
import Navigation from '@theblock/lib-ui/src/navigation';

import styles from './home.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Home ({ className, t }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <div className={ styles.base }>
        <Navigation />
        <div className={ styles.overlay }>
          <div className={ styles.title }>
            { t('title') }
          </div>
        </div>
      </div>
      <main>
        <section>
          { t('about') }
        </section>
        <section className={ styles.warning }>
          { t('warning') }
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default translate(['home'])(Home);
