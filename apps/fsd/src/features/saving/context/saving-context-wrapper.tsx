import { PropsWithChildren, createContext, useCallback, useMemo } from 'react';

import { trackFutureChange } from '@/widgets/changes-tracker/stores/use-changes-tracker-store';

import { getSavingStatus, setSavingStatus } from '../stores/use-saving-store';
import type { OnSave } from '../types';

type SavingContextType = {
  onSave: OnSave;
};

export const SavingContext = createContext<SavingContextType>({
  onSave: async () => 'error',
});

type Props = PropsWithChildren<SavingContextType>;

export function SavingContextWrapper({ onSave, children }: Props) {
  const handleSave: OnSave = useCallback(
    async (savingParams) => {
      const savingStatus = getSavingStatus();

      if (savingStatus === 'saving') {
        return 'alreadyStarted';
      }

      setSavingStatus('saving');

      const didSaveStatus = await onSave(savingParams);

      if (didSaveStatus === 'success') {
        setSavingStatus('saved');

        if (!savingParams?.isAutoSave) {
          trackFutureChange('manualSave');
        }
      } else {
        setSavingStatus(savingParams?.isAutoSave ? 'waiting' : 'notSaved');
      }

      return didSaveStatus;
    },
    [onSave],
  );

  const value = useMemo(
    () => ({
      onSave: handleSave,
    }),
    [handleSave],
  );

  return <SavingContext.Provider value={value}>{children}</SavingContext.Provider>;
}
