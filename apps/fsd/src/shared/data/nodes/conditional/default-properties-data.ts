import { NodeDataProperties } from '@/shared/json-form/types/default-properties';

import { ConditionalNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<ConditionalNodeSchema>> = {
  label: 'Conditional',
  description: 'Branch the workflow',
  conditionsArray: [],
};
