// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import InfoBar from 'theblock-lib-ui/src/infoBar';
import InfoPopup from 'theblock-lib-ui/src/infoPopup';
import InputAddress from 'theblock-lib-ui/src/input/address';

import { ImportStore } from './store';

type PropTypes = {
  className?: string,
  store: ImportStore,
  t: (string) => string
};

function Busy ({ className, store, t }: PropTypes): ?React.Element<any> {
  if (['empty', 'error'].includes(store.state)) {
    return null;
  }

  return (
    <InfoBar>
      <InfoPopup
        color={
          store.state === 'completed'
            ? 'green'
            : 'orange'
        }
        onClose={ store.clearState }
        title={
          store.state === 'completed'
            ? t('popup.completed.title')
            : t('popup.busy.title')
        }
      >
        <Interpolate
          parent='section'
          i18nKey={
            store.state === 'completed'
              ? 'popup.completed.text'
              : 'popup.busy.text'
          }
          addressDetails={
            <InputAddress
              isReadOnly
              copyValue={ store.address }
              value={ store.address }
            />
          }
        />
      </InfoPopup>
    </InfoBar>
  );
}

export default translate(['import'])(observer(Busy));
