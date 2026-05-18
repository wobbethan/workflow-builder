import { NodeAddChange, XYPosition } from '@xyflow/react';

import { NodeData, WorkflowBuilderNode } from '@/shared/types/node-data';
import { NodeType } from '@/shared/types/node-types';

export function getNodeAddChange(
  templateType: NodeType,
  position: XYPosition | undefined,
  data: NodeData,
  id: string,
): NodeAddChange<WorkflowBuilderNode>[] {
  return [
    {
      type: 'add',
      item: {
        id,
        type: templateType,
        position: position ?? { x: 0, y: 0 },
        data: {
          segments: [],
          ...data,
        },
        selected: true,
      },
    },
  ];
}
