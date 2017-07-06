// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';

import Navigation from '@theblock/lib-ui/src/navigation';

import Summary from './summary';
import styles from './blog.scss';

type PropTypes = {
  className?: string,
  summaries: ?Array<string>
};

export default function Blog ({ className, summaries }: PropTypes): ?React.Element<any> {
  if (!summaries) {
    return null;
  }

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
        {
          summaries.map((link: string) => (
            <Summary link={ link } />
          ))
        }
      </main>
    </div>
  );
}
