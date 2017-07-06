// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './tooltip.scss';

type PropTypes = {
  children?: React.Element<any>,
  className?: string,
  value?: string
};

let tooltipIdNext = 0;

export default function Tooltip ({ children, className, value }: PropTypes): ?React.Element<any> {
  if (!value) {
    return null;
  }

  const tooltipId: string = `tooltip_${++tooltipIdNext}`;

  return (
    <div
      className={
        compact([
          styles.ui, className
        ]).join(' ')
      }
    >
      <div
        data-for={ tooltipId }
        data-tip
      >
        { children }
      </div>
      <ReactTooltip
        effect='float'
        id={ tooltipId }
        place='bottom'
        type='info'
      >
        { value }
      </ReactTooltip>
    </div>
  );
}
