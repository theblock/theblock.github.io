// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React from 'react';
import { observer } from 'mobx-react';
import { translate } from 'react-i18next';

import Navigation from 'theblock-lib-ui/src/navigation';
import Select from 'theblock-lib-ui/src/input/select';

import chains from '../store/chains';
import store from './store';
import Item from './item';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function WalletNavigation ({ className, t }: PropTypes): React.Element<any> {
  return (
    <Navigation
      links={
        <Select
          store={ chains }
        />
      }
    >
      {
        store.filtered.map((item) => (
          <Item
            isSelected={ store.selected.key === item.key }
            item={ item }
            key={ item.key }
            onSelect={ store.selectItem }
          />
        ))
      }
    </Navigation>
  );
}

export default translate([])(observer(WalletNavigation));
