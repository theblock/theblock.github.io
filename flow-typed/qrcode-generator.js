// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

declare module 'qrcode-generator' {
  declare module.exports: (type: number, errorLevel: string) => {
    addData: (data: any, type: string) => void;
    make: () => void;
    createImgTag: (cellSize?: number, margin?: number) => string;
  }
}
