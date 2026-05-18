import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SavingStatus = 'disabled' | 'waiting' | 'saving' | 'saved' | 'notSaved';

type SavingStore = {
  savingStatus: SavingStatus;
  lastSaveAttemptTimestamp: number;
};

export const useSavingStore = create<SavingStore>()(
  devtools(
    () =>
      ({
        savingStatus: 'disabled',
        lastSaveAttemptTimestamp: Date.now(),
      }) satisfies SavingStore,
    { name: 'savingStore' },
  ),
);

export function getSavingStatus() {
  return useSavingStore.getState().savingStatus;
}

export function setSavingStatus(savingStatus: SavingStatus) {
  return useSavingStore.setState((state) => ({
    savingStatus,
    lastSaveAttemptTimestamp: savingStatus === 'saved' ? Date.now() : state.lastSaveAttemptTimestamp,
  }));
}
