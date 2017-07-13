// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import { observer } from 'mobx-react';
import React from 'react';
import { translate } from 'react-i18next';

import type { SelectableInterface } from '../../types';
import type Store from './store';

import { ArrowDownIcon } from '../../icons';
import Input from '../index';

import Item from './item';
import styles from './select.scss';

type PropTypes = {
  className?: string,
  copyValue?: ?string,
  displayKey?: boolean,
  example?: string,
  hideIcon?: boolean,
  hint?: string,
  icon?: ?React.Element<any>,
  isBusy?: boolean,
  isDisabled?: boolean,
  isError?: boolean,
  isInverted?: boolean,
  isReadOnly?: boolean,
  isMaxWidth?: boolean,
  label?: string,
  onChange?: (string) => mixed,
  store: Store<SelectableInterface>,
  t: (string) => string
};

function Select ({ className, copyValue, displayKey, example, hideIcon, hint, icon, isBusy, isDisabled, isError, isInverted, isMaxWidth, isReadOnly, label, onChange, store, t }: PropTypes): React.Element<any> {
  const _onBlur = (event) => {
    store.setOpen(false);
  };

  const _onChange = ({ target: { value } }) => {
    store.setSearch(value);

    onChange && onChange(value);
  };

  const _onClick = () => {
    store.toggleOpen();
  };

  const _onKeyDown = () => {
    if (!store.isOpen) {
      store.setOpen(true);
    }
  };

  const _onSelect = (event, key) => {
    store.selectItem(key);
    store.setOpen(false);

    onChange && onChange(key);

    event.stopPropagation();
    event.preventDefault();
  };

  const _onFocus = () => {
    store.setOpen(true);
  };

  const displayText: ?string = displayKey
    ? store.selected.key
    : store.selected.label || store.selected.key;
  const longestText: string = displayKey
    ? store.longestKey
    : store.longestLabel || store.longestKey;

  return (
    <Input
      className={
        compact([
          styles.ui, store.isOpen && styles.withOpen, className
        ]).join(' ')
      }
      copyValue={ copyValue }
      example={ example }
      hideIcon={ hideIcon }
      hint={ hint }
      icon={ icon || store.selected.icon }
      iconAction={ <ArrowDownIcon /> }
      isBusy={ isBusy }
      isDisabled={ isDisabled }
      isError={ isError }
      isInverted={ isInverted }
      isMaxWidth={ isMaxWidth }
      isReadOnly={ isReadOnly || (!store.isSearch && store.filtered.length <= 1) }
      label={ label }
      value={
        (
          store.isOpen
            ? longestText
            : displayText
        ) ||
        (
          store.isSearch
            ? store.search
            : ''
        )
      }
    >
      <input
        onBlur={ _onBlur }
        onChange={ _onChange }
        onKeyDown={ _onKeyDown }
        onMouseDown={ _onClick }
        onFocus={ _onFocus }
        readOnly={ !store.isSearch }
        type='text'
        value={
          (store.isOpen && store.isSearch)
            ? store.search
            : displayText
        }
      />
      {
        store.isOpen && store.hasItems
          ? (
            <div className={ styles.menu }>
              {
                store.filtered.map((item: SelectableInterface) => (
                  <Item
                    isSelected={ item.key === store.selected.key }
                    item={ item }
                    key={ item.key }
                    onSelect={ _onSelect }
                  />
                ))
              }
            </div>
          )
          : null
      }
    </Input>
  );
}

export default translate()(observer(Select));
