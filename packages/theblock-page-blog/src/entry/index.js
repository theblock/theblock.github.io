// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { translate } from 'react-i18next';

import Html from '@theblock/lib-ui/src/html';
import Navigation from '@theblock/lib-ui/src/navigation';

import styles from './entry.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Entry ({ className, t }: PropTypes): React.Element<any> {
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
        <article>
          <div className={ styles.content }>
            <Html
              className={ styles.intro }
              html={ t('intro') }
            />
            <Html
              className={ styles.body }
              html={ t('body') }
            />
          </div>
        </article>
      </main>
    </div>
  );
}

export default translate(['entry'])(Entry);
