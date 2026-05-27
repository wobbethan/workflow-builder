import { Spinner } from '@phosphor-icons/react';
import clsx from 'clsx';

import { Icon } from '@workflow-builder/icons';

import styles from './saving-status.module.css';

import { useSavingStore } from '../../stores/use-saving-store';

export function SavingStatus() {
  const lastSaveAttemptTimestamp = useSavingStore((state) => state.lastSaveAttemptTimestamp);
  const savingStatus = useSavingStore((state) => state.savingStatus);

  if (savingStatus === 'saving') {
    return (
      <span className={clsx(styles['status'], styles['status--saving'])}>
        <Spinner />
      </span>
    );
  }

  if (savingStatus === 'saved') {
    return (
      <span key={lastSaveAttemptTimestamp} className={clsx(styles['status'], styles['status--saved'])}>
        <Icon name="CheckCircle" />
      </span>
    );
  }

  if (savingStatus === 'notSaved') {
    return (
      <span key={lastSaveAttemptTimestamp} className={clsx(styles['status'], styles['status--not-saved'])}>
        <Icon name="XCircle" />
      </span>
    );
  }

  return null;
}
