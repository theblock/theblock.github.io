// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element } from 'react';
import { translate } from 'react-i18next';

import Background from '@theblock/lib-ui/src/background404';
import Errors from '@theblock/lib-ui/src/errors';
import InfoBar from '@theblock/lib-ui/src/infoBar';

import styles from './fourOhFour.scss';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function FourOhFour ({ className, t }: PropTypes): Element<any> {
  return (
    <div
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <Background />
      <InfoBar>
        <Errors
          errors={ [{
            message: t('message'),
            title: t('title')
          }] }
        />
      </InfoBar>
    </div>
  );
}

export default translate(['fourOhFour'])(FourOhFour);
