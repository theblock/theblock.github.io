// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import { translate } from 'react-i18next';

import Block from '../block';
import InputLink from '../input/link';
import Language from '../language';

import styles from './navigation.scss';

const LINKS: Array<string> = ['home', 'blog', 'wallet'];

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  links?: React.Element<any>,
  t: (string) => string
};

function Navigation ({ children, className, links, t }: PropTypes): React.Element<any> {
  const path: string = window.location.pathname.split('/')[2];

  return (
    <nav
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      <div className={ styles.topbar }>
        <div className={ styles.navigation }>
          {
            LINKS.map((link) => (
              <InputLink
                href={ `/x/${link}` }
                isInternal
                isReadOnly={ path === link }
                key={ link }
                value={ t(`ui:navigation.${link}`) }
              />
            ))
          }
          <Block className={ styles.logo } />
        </div>
        <div className={ styles.links }>
          <Language />
          { links }
        </div>
      </div>
      {
        children
          ? (
            <div className={ styles.subbar }>
              { children }
            </div>
          )
          : null
      }
    </nav>
  );
}

export default translate()(Navigation);
