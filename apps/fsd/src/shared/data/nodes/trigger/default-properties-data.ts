import { NodeDataProperties } from '@/shared/json-form/types/default-properties';

import { TriggerNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<TriggerNodeSchema>> = {
  label: 'Trigger',
  description: 'Initiate workflows',
  status: 'active',
  timeSchedule: {
    allDay: false,
    frequency: 'none',
    allDayFrequency: 'none',
  },
  retrySettings: {
    interval: 'every15min',
    retries: '5',
    timeout: '30Min',
  },
};
