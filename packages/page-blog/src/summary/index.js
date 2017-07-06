// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { translate } from 'react-i18next';

import InputLink from '@theblock/lib-ui/src/input/link';
import Html from '@theblock/lib-ui/src/html';

import styles from './summary.scss';

type PropTypes = {
  className?: string,
  link: string,
  t: (string) => string
};

function Summary ({ className, link, t }: PropTypes): React.Element<any> {
  return (
    <article
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <Html
        className={ styles.content }
        html={ t(`${link}:intro`) }
      />
      <div className={ styles.more }>
        <InputLink
          href={ `/x/blog/${link}` }
          isInternal
          value={ t('summary:readMore') }
        />
      </div>
    </article>
  );
}

export default translate([])(Summary);
