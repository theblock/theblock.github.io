// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import Errors from 'theblock-lib-ui/src/errors';
import InfoBar from 'theblock-lib-ui/src/infoBar';

import injectHandlers from './handlers';
import errorStore from './store/errors';

import Body from './body';
import Navigation from './navigation';
import Transactions from './transactions';
import styles from './wallet.scss';

injectHandlers();

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Wallet ({ className, t }: PropTypes): React.Element<any> {
  return (
    <div
      className={
        compact([
          styles.root, className
        ]).join(' ')
      }
    >
      <InfoBar>
        <Errors errors={ errorStore.errors } />
        <Transactions />
      </InfoBar>
      <Navigation />
      <Body />
    </div>
  );
}

export default translate(['wallet'])(observer(Wallet));
