// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import qrcode from 'qrcode-generator';
import React from 'react';

import Html from '../html';

type PropTypes = {
  className?: string,
  value: string
};

export default function QrCode ({ className, value }: PropTypes): React.Element<any> {
  const qr = qrcode(5, 'M');

  qr.addData(value);
  qr.make();

  return (
    <Html
      className={ className }
      html={ qr.createImgTag(5, 0) }
    />
  );
}
