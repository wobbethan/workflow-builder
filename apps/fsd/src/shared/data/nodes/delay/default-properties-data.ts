import { NodeDataProperties } from '@/shared/json-form/types/default-properties';

import { DelayNodeSchema } from './schema';
import { delayTypeOptions } from './select-options';

export const defaultPropertiesData: Required<NodeDataProperties<DelayNodeSchema>> = {
  label: 'Delay',
  description: 'Pause the workflow',
  status: 'active',
  duration: {
    timeUnits: 'none',
    delayAmount: 3,
    maxWaitTime: '24',
    expression: 'order.processing_time * 2',
  },
  type: delayTypeOptions.fixed.value,
};
