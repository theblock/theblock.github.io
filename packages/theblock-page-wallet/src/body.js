// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import navStore from './navigation/store';
import Accounts from './accounts';
import Import from './import';
import Send from './send';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function Body ({ className, t }: PropTypes): ?React.Element<any> {
  switch (navStore.selected.key) {
    case 'listAccounts':
      return <Accounts />;

    case 'importAccount':
      return <Import />;

    case 'send':
      return <Send />;

    default:
      return null;
  }
}

export default translate(['wallet'])(observer(Body));
