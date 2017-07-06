// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

const preloaded: Array<Image> = [];

export function preloadImage (src: string, onLoad?: () => void): string {
  const image: Image = new Image();

  image.onload = () => onLoad && onLoad();
  image.src = src;

  preloaded.push(image);

  return src;
}
