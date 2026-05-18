import { XYPosition, useStoreApi } from '@xyflow/react';
import { DragEvent, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import { DraggingItem } from '@/shared/types/common';

import { dataFormat } from '@/utils/consts';
import { getNodeAddChange } from '@/utils/get-node-add-change';

import useStore from '@/store/store';

import { trackFutureChange } from '@/widgets/changes-tracker/stores/use-changes-tracker-store';

import { BaseNodeProperties } from '@/shared/types/node-schema';
import { NodeType } from '@/shared/types/node-types';

export function usePaletteDrop() {
  const resetSelectedElements = useStoreApi().getState().resetSelectedElements;
  const [reactFlowInstance, onNodesChange, getNodeDefinition] = useStore(
    useShallow((store) => [store.reactFlowInstance, store.onNodesChange, store.getNodeDefinition]),
  );

  const dropNode = useCallback(
    (position: XYPosition | undefined, nodeType: string) => {
      const nodeDefinition = getNodeDefinition(nodeType);
      if (!nodeDefinition) {
        return;
      }

      const { defaultPropertiesData, type, icon, templateType = NodeType.Node } = nodeDefinition;
      const defaultProps = defaultPropertiesData as BaseNodeProperties;

      const label = defaultProps.label || nodeDefinition.label;
      const description = defaultProps.description || nodeDefinition.description;

      const data = {
        properties: { ...defaultPropertiesData, label, description },
        type,
        icon,
      };

      const newNodeId = crypto.randomUUID();
      trackFutureChange('addNode', { nodeType: type });
      resetSelectedElements();
      onNodesChange(getNodeAddChange(templateType, position, data, newNodeId));
    },
    [getNodeDefinition, resetSelectedElements, onNodesChange],
  );

  const onDropFromPalette = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const json = event.dataTransfer?.getData(dataFormat);
      if (!json) return;

      const draggingItem = JSON.parse(json) as DraggingItem;
      const { type } = draggingItem;

      dropNode(position, type);
    },
    [reactFlowInstance, dropNode],
  );

  return { onDropFromPalette };
}
