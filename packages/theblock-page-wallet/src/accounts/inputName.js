// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import Input from 'theblock-lib-ui/src/input';

import AccountStore from '../store/accounts/account';

type PropTypes = {
  account: AccountStore,
  onEditDone?: (id: string) => void,
  t: (string) => string
};

function Account ({ account, onEditDone, t }: PropTypes): React.Element<any> {
  const _onBlurName = () => account.toggleAccountName(onEditDone);

  return (
    <Input
      isError={ !account.name }
      onBlur={ _onBlurName }
      onChange={ account.setName }
      value={ account.name }
      valueDisplay={
        account.name
          ? account.name
          : t('name.defaultName')
      }
    />
  );
}

export default translate(['accounts'])(observer(Account));
