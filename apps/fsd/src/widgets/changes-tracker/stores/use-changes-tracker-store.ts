import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initTimestamp = Date.now();

type ChangesTrackerStore = {
  lastChangeName: string;
  lastChangeParams: object;
  lastChangeTimestamp: number;
};

const emptyStore: ChangesTrackerStore = {
  lastChangeName: '',
  lastChangeParams: {},
  lastChangeTimestamp: initTimestamp,
};

export const useChangesTrackerStore = create<ChangesTrackerStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies ChangesTrackerStore,
    { name: 'changesTrackerStore' },
  ),
);

export function trackFutureChange(changeName: string, params?: object) {
  useChangesTrackerStore.setState({
    lastChangeName: changeName,
    lastChangeParams: params || {},
    lastChangeTimestamp: Date.now(),
  });
}
