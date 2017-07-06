// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import Field from '@theblock/lib-ui/src/field';
import InputTextarea from '@theblock/lib-ui/src/input/textarea';

import { ImportStore } from '../store';

type PropTypes = {
  className?: string,
  store: ImportStore,
  t: (string) => string
};

function Brain ({ className, store, t }: PropTypes): React.Element<any> {
  return (
    <Field>
      <Interpolate
        parent='div'
        i18nKey='keytype.brainPhrase.text'
      />
      <div>
        <InputTextarea
          example={ t('keytype.brainPhrase.example') }
          isError={ store.hasEmptyPhrase }
          isMaxWidth
          onChange={ store.setPhrase }
          value={ store.phrase }
        />
      </div>
    </Field>
  );
}

export default translate(['import'])(observer(Brain));
