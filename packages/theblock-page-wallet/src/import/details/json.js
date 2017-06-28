// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import { observer } from 'mobx-react';
import React from 'react';
import { Interpolate, translate } from 'react-i18next';

import InputFile from 'theblock-lib-ui/src/input/file';

import { ImportStore } from '../store';

type PropTypes = {
  className?: string,
  store: ImportStore,
  t: (string) => string
};

function Json ({ className, store, t }: PropTypes): React.Element<any> {
  return (
    <div>
      <Interpolate
        parent='div'
        i18nKey='keytype.json.file.text'
        inputFile={
          <InputFile
            isError={ store.hasJsonError }
            onChange={ store.setJsonFile }
            value={ store.jsonFilename }
          />
        }
      />
    </div>
  );
}

export default translate(['import'])(observer(Json));
