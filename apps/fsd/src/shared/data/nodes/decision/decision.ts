import { PaletteItem } from '@/shared/types/common';
import { NodeType } from '@/shared/types/node-types';

import { defaultPropertiesData } from './default-properties-data';
import { DecisionNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const decision: PaletteItem<DecisionNodeSchema> = {
  label: 'Decision',
  description: 'Route the workflow',
  type: 'decision',
  icon: 'ArrowsSplit',
  templateType: NodeType.DecisionNode,
  defaultPropertiesData,
  schema,
  uischema,
  outputSchema: {
    properties: {
      selectedBranch: { type: 'string', label: 'Selected Branch', description: 'Label of the branch that was taken' },
      branchIndex: { type: 'number', label: 'Branch Index', description: 'Zero-based index of the selected branch' },
    },
  },
};
