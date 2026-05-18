import { NodeDataProperties } from '@/shared/json-form/types/default-properties';

import { statusOptions } from '../shared/general-information';
import { DecisionNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<DecisionNodeSchema>> = {
  label: 'Decision',
  description: 'Route the workflow',
  status: statusOptions.active.value,
  decisionBranches: [],
};
