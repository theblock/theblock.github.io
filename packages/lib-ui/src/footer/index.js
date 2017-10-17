// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

// import { GitHubIcon, RedditIcon, TwitterIcon } from '../icons';
import { GitHubIcon } from '../icons';

import styles from './footer.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

console.log('v', process.env.APP_VERSION);

// reddit={
//   <a
//     href='https://reddit.com/r/theblockio'
//     rel='noopener'
//   >
//     <RedditIcon /> Reddit
//   </a>
// }
// twitter={
//   <a
//     href='https://twitter.com/theblockio'
//     rel='noopener'
//   >
//     <TwitterIcon /> Twitter
//   </a>
// }

function Footer ({ className, t }: PropTypes): React.Element<any> {
  return (
    <footer
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      <Interpolate
        i18nKey='ui:footer.text'
        parent='div'
        github={
          <a
            href='https://github.com/theblock'
            rel='noopener'
          >
            <GitHubIcon /> GitHub
          </a>
        }
        version={ process.env.APP_VERSION }
      />
    </footer>
  );
}

export default translate()(Footer);
