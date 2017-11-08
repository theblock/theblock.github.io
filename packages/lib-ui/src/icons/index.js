// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import compact from 'lodash.compact';
import React, { type Element } from 'react';

import styles from './icons.scss';

type PropTypes = {
  className?: string,
  onClick?: (Event) => mixed,
  style?: { [string]: string }
};

function createIcon (type: string, { className, onClick, style }: PropTypes): Element<any> {
  return (
    <i
      className={
        compact([
          styles.ui, `fa fa-${type}`, className
        ]).join(' ')
      }
      onClick={ onClick }
      style={ style }
    />
  );
}

export const AccountIcon = (p: PropTypes) => createIcon('user-circle', p);
export const AccountAddIcon = (p: PropTypes) => createIcon('user-plus', p);
export const AccountListIcon = (p: PropTypes) => createIcon('users', p);
export const AddIcon = (p: PropTypes) => createIcon('plus', p);
export const ArrowDownIcon = (p: PropTypes) => createIcon('chevron-down', p);
export const ArrowLeftIcon = (p: PropTypes) => createIcon('chevron-left', p);
export const ArrowRightIcon = (p: PropTypes) => createIcon('chevron-right', p);
export const ArrowUpIcon = (p: PropTypes) => createIcon('chevron-up', p);
export const BalanceIcon = (p: PropTypes) => createIcon('credit-card', p);
export const BrowserIcon = (p: PropTypes) => createIcon('chrome', p);
export const BusyIcon = (p: PropTypes) => createIcon('spinner fa-pulse fa-fw', p);
export const BusyNetworkIcon = (p: PropTypes) => createIcon('circle-o-notch fa-spin fa-fw', p);
export const CancelIcon = (p: PropTypes) => createIcon('times', p);
export const ChainIcon = (p: PropTypes) => createIcon('link', p);
export const CheckboxCheckedIcon = (p: PropTypes) => createIcon('check-square-o', p);
export const CheckboxUncheckedIcon = (p: PropTypes) => createIcon('square-o', p);
export const ClipboardIcon = (p: PropTypes) => createIcon('clipboard', p);
export const CloseIcon = (p: PropTypes) => createIcon('times-circle', p);
export const CodeIcon = (p: PropTypes) => createIcon('code', p);
export const DataIcon = CodeIcon;
export const EditIcon = (p: PropTypes) => createIcon('pencil', p);
export const EmptyIcon = (p: PropTypes) => createIcon('question-circle-o', p);
export const ErrorIcon = (p: PropTypes) => createIcon('exclamation-circle', p);
export const EyeIcon = (p: PropTypes) => createIcon('eye', p);
export const EyeSlashIcon = (p: PropTypes) => createIcon('eye-slash', p);
export const FiatEurIcon = (p: PropTypes) => createIcon('eur', p);
export const FiatUsdIcon = (p: PropTypes) => createIcon('usd', p);
export const FileIcon = (p: PropTypes) => createIcon('file-code-o', p);
export const GasIcon = (p: PropTypes) => createIcon('flask', p);
export const GasPriceIcon = (p: PropTypes) => createIcon('tag', p);
export const GitHubIcon = (p: PropTypes) => createIcon('github', p);
export const ImportIcon = (p: PropTypes) => createIcon('upload', p);
export const JsonFileIcon = (p: PropTypes) => createIcon('file-text-o', p);
export const LinkIcon = (p: PropTypes) => createIcon('external-link', p);
export const NameIcon = (p: PropTypes) => createIcon('address-book-o', p);
export const NullIcon = (p: PropTypes) => createIcon('grav', p);
export const PasswordIcon = (p: PropTypes) => createIcon('key', p);
export const PhraseIcon = (p: PropTypes) => createIcon('user-secret', p);
export const PlusIcon = (p: PropTypes) => createIcon('plus', p);
export const RadioCheckedIcon = (p: PropTypes) => createIcon('square', p);
export const RadioUncheckedIcon = (p: PropTypes) => createIcon('square-o', p);
export const ReceiveIcon = (p: PropTypes) => createIcon('envelope-o', p);
export const RedditIcon = (p: PropTypes) => createIcon('reddit', p);
export const RefreshIcon = (p: PropTypes) => createIcon('refresh', p);
export const RejectIcon = (p: PropTypes) => createIcon('exclamation-triangle', p);
export const UnlockIcon = (p: PropTypes) => createIcon('unlock', p);
export const SecureIcon = (p: PropTypes) => createIcon('shield', p);
export const SendIcon = (p: PropTypes) => createIcon('send-o', p);
export const SessionIcon = (p: PropTypes) => createIcon('superpowers', p);
export const TwitterIcon = (p: PropTypes) => createIcon('twitter', p);
