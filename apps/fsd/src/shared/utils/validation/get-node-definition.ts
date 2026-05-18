import { PaletteItem } from '@/shared/types/common';
import { WorkflowBuilderNode } from '@/shared/types/node-data';

import { getPaletteData } from '@/data/palette';

import { getNodesDefinitionsByType } from './get-nodes-definitions-by-type';

export function getNodeDefinition(node?: WorkflowBuilderNode): PaletteItem | undefined {
  const nodesDefinitionsByType = getNodesDefinitionsByType(getPaletteData());

  const dataType = node?.data?.type || '';

  return nodesDefinitionsByType[dataType];
}
