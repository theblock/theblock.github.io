// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import React, { type Element } from 'react';
import { observer } from 'mobx-react';
import { translate } from 'react-i18next';

import Navigation from '@theblock/lib-ui/src/navigation';

import store from './store';
import Item from './item';

type PropTypes = {
  className?: string,
  t: (string) => string
};

function WalletNavigation ({ className, t }: PropTypes): Element<any> {
  return (
    <Navigation empty>
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
