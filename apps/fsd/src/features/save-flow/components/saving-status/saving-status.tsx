import { Spinner } from '@phosphor-icons/react';

import { Icon } from '@workflow-builder/icons';

import { useSavingStore } from '../../stores/use-saving-store';

export function SavingStatus() {
  const lastSaveAttemptTimestamp = useSavingStore((state) => state.lastSaveAttemptTimestamp);
  const savingStatus = useSavingStore((state) => state.savingStatus);

  if (savingStatus === 'saving') {
    return (
      <span className="absolute top-0 -right-1 z-[1] pointer-events-none [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:bg-[var(--wb-app-bar-background)] [&_svg]:rounded-full [&_svg]:animate-[spin_1.3s_linear_infinite] [&_svg]:text-[var(--wb-saving-status--in-progress-color)]">
        <Spinner />
      </span>
    );
  }

  if (savingStatus === 'saved') {
    return (
      <span key={lastSaveAttemptTimestamp} className="absolute top-0 -right-1 z-[1] pointer-events-none [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:bg-[var(--wb-app-bar-background)] [&_svg]:rounded-full [&_svg]:text-[var(--wb-saving-status--saved-color)] [&_svg]:animate-[fade-out_0.5s_both_0.8s]">
        <Icon name="CheckCircle" />
      </span>
    );
  }

  if (savingStatus === 'notSaved') {
    return (
      <span key={lastSaveAttemptTimestamp} className="absolute top-0 -right-1 z-[1] pointer-events-none [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:bg-[var(--wb-app-bar-background)] [&_svg]:rounded-full [&_svg]:text-[var(--wb-saving-status--not-saved-color)] [&_svg]:animate-[fade-out_0.5s_both_0.8s]">
        <Icon name="XCircle" />
      </span>
    );
  }

  return null;
}
