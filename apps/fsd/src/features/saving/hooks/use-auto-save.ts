import { useContext, useEffect, useRef } from 'react';

import { useChangesTrackerStore } from '@/widgets/changes-tracker/stores/use-changes-tracker-store';

import { SavingContext } from '../context/saving-context-wrapper';
import {
  AUTO_SAVE_DELAY_IN_MS,
  AUTO_SAVE_IF_CHANGED_OVER_X_SECONDS_AGO,
  SKIP_AUTO_SAVE_CHECK_FOR_EVENTS,
} from '../consts';
import { useSavingStore } from '../stores/use-saving-store';

export function useAutoSave() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastChangeName = useChangesTrackerStore((store) => store.lastChangeName);
  const lastChangeTimestamp = useChangesTrackerStore((store) => store.lastChangeTimestamp);
  const lastSaveAttemptTimestamp = useSavingStore((state) => state.lastSaveAttemptTimestamp);

  const { onSave } = useContext(SavingContext);

  useEffect(() => {
    const shouldSkipAutoSave = SKIP_AUTO_SAVE_CHECK_FOR_EVENTS.includes(lastChangeName);

    if (shouldSkipAutoSave) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const differenceInSeconds = (lastChangeTimestamp - lastSaveAttemptTimestamp) / 1000;
    const isDifferenceLongEnough = AUTO_SAVE_IF_CHANGED_OVER_X_SECONDS_AGO < differenceInSeconds;

    if (isDifferenceLongEnough) {
      timeoutRef.current = setTimeout(() => onSave({ isAutoSave: true }), AUTO_SAVE_DELAY_IN_MS);
    }
  }, [lastChangeName, lastChangeTimestamp, lastSaveAttemptTimestamp, onSave]);
}
