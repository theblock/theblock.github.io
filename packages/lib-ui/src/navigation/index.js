// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element, type Node } from 'react';
import { translate } from 'react-i18next';

import Block from '../block';
import ImgPattern from '../img/pattern';
import Language from '../language';

import styles from './navigation.scss';

type PropTypes = {
  children?: Node,
  className?: string,
  empty?: boolean,
  links?: Element<any>,
  t: (string) => string
};

function Navigation ({ children, className, empty, links, t }: PropTypes): Element<any> {
  return (
    <nav
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      <ImgPattern>
        {
          empty
            ? null
            : (
              <div className={ styles.topbar }>
                <Block className={ styles.logo } />
                <div className={ styles.links }>
                  <Language />
                  { links }
                </div>
              </div>
            )
        }
        {
          children
            ? (
              <div className={ styles.subbar }>
                {
                  empty
                    ? <Block className={ styles.logo } />
                    : null
                }
                { children }
              </div>
            )
            : null
        }
      </ImgPattern>
    </nav>
  );
}

export default translate()(Navigation);
