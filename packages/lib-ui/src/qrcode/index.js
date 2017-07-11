// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import qrcode from 'qrcode-generator';
import React from 'react';

import { calculateType } from './calc';
import Html from '../html';

type PropTypes = {
  className?: string,
  value: string
};

export default function QrCode ({ className, value }: PropTypes): React.Element<any> {
  const qr = qrcode(calculateType(value.length), 'M');

  qr.addData(value, 'Byte');
  qr.make();

  return (
    <Html
      className={ className }
      html={ qr.createImgTag(5, 0) }
    />
  );
}
