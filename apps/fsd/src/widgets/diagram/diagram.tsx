import {
  Background,
  EdgeTypes,
  FitViewOptions,
  NodeChange,
  OnBeforeDelete,
  OnConnect,
  OnNodeDrag,
  OnSelectionChangeParams,
  ReactFlow,
  SelectionMode,
  useUpdateNodeInternals,
} from '@xyflow/react';
import { DragEventHandler, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { DragEvent } from 'react';

import { WorkflowBuilderOnSelectionChangeParams } from '@/shared/types/common';
import { WorkflowBuilderEdge, WorkflowBuilderNode } from '@/shared/types/node-data';

import '@xyflow/react/dist/style.css';

import useStore from '@/store/store';

import { ModalProvider } from '@/features/modals';

import { trackFutureChange } from '@/widgets/changes-tracker/stores/use-changes-tracker-store';
import { SNAP_GRID, SNAP_IS_ACTIVE } from '@/widgets/diagram/diagram.const';
import {
  callNodeChangedListeners,
  destroyNodeChangedListeners,
} from '@/widgets/diagram/listeners/node-changed-listeners';
import { useDeleteConfirmation } from '@/features/delete-node/hooks/use-delete-confirmation';

import { usePaletteDrop } from '@/shared/hooks/use-palette-drop';

import { deleteKeyCode } from './const';
import { LabelEdge } from './edges/label-edge/label-edge';
import { TemporaryEdge } from './edges/temporary-edge/temporary-edge';
import { useNodeTypes } from './hooks/use-node-types';
import { callNodeDragStartListeners, destroyNodeDragStartListeners } from './listeners/node-drag-start-listeners';
import { diagramStateSelector } from './selectors';

function DiagramContainerComponent({ edgeTypes = {} }: { edgeTypes?: EdgeTypes }) {
  const {
    nodes,
    edges,
    isReadOnlyMode,
    onNodesChange,
    onEdgesChange,
    onEdgeMouseEnter,
    onEdgeMouseLeave,
    onConnect: onConnectAction,
    onInit,
    onSelectionChange,
  } = useStore(diagramStateSelector);

  const { openDeleteConfirmationModal } = useDeleteConfirmation();

  const setConnectionBeingDragged = useStore((store) => store.setConnectionBeingDragged);
  const layoutDirection = useStore((store) => store.layoutDirection);
  const nodeTypes = useNodeTypes();
  const updateNodeInternals = useUpdateNodeInternals();

  useLayoutEffect(() => {
    const nodeIds = useStore.getState().nodes.map((node) => node.id);
    if (nodeIds.length === 0) {
      return;
    }
    updateNodeInternals(nodeIds);
  }, [layoutDirection, updateNodeInternals]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const { onDropFromPalette } = usePaletteDrop();

  const fitViewOptions: FitViewOptions = useMemo(() => ({ maxZoom: 1 }), []);

  const onNodeDragStart: OnNodeDrag = useCallback((event, node, nodes) => {
    trackFutureChange('nodeDragStart');
    callNodeDragStartListeners(event, node, nodes);
  }, []);

  const onDrop: DragEventHandler = useCallback(
    (event) => {
      onDropFromPalette(event);
    },
    [onDropFromPalette],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      trackFutureChange('addEdge');
      onConnectAction(connection);
    },
    [onConnectAction],
  );

  const onConnectStart = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: any,
      { nodeId, handleId }: { nodeId: string | null; handleId: string | null },
    ) => {
      setConnectionBeingDragged(nodeId, handleId);
    },
    [setConnectionBeingDragged],
  );

  const onConnectEnd = useCallback(() => {
    setConnectionBeingDragged(null, null);
  }, [setConnectionBeingDragged]);

  const onNodeDragStop = useCallback(() => {
    return trackFutureChange('nodeDragStop');
  }, []);

  const handleOnNodesChange = useCallback(
    (changes: NodeChange<WorkflowBuilderNode>[]) => {
      trackFutureChange('nodeDragChange');
      callNodeChangedListeners(changes);
      onNodesChange(changes);
    },
    [onNodesChange],
  );

  const handleOnSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      onSelectionChange(params as WorkflowBuilderOnSelectionChangeParams);
    },
    [onSelectionChange],
  );

  useEffect(() => {
    destroyNodeChangedListeners();
    destroyNodeDragStartListeners();
  }, []);

  const diagramEdgeTypes = useMemo(() => ({ labelEdge: LabelEdge, ...edgeTypes }), [edgeTypes]);

  const onBeforeDelete: OnBeforeDelete<WorkflowBuilderNode, WorkflowBuilderEdge> = useCallback(
    async ({ nodes, edges }) => {
      if (isReadOnlyMode) {
        return false;
      }

      return new Promise((resolve) => {
        openDeleteConfirmationModal({
          nodes,
          edges,
          onDeleteClick: () => {
            trackFutureChange('delete');
            resolve(true);
          },
          onModalClosed: () => resolve(false),
        });
      });
    },
    [isReadOnlyMode, openDeleteConfirmationModal],
  );

  const panOnDrag = [1, 2];

  return (
    <>
      <div className="h-screen w-screen [&_.react-flow__attribution]:!hidden [&_.react-flow__edgelabel-renderer]:z-[1001]">
      <ReactFlow<WorkflowBuilderNode, WorkflowBuilderEdge>
        edges={edges}
        edgeTypes={diagramEdgeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onInit={onInit}
        onDrop={onDrop}
        connectionLineComponent={TemporaryEdge}
        panOnScroll
        nodes={nodes}
        nodesConnectable={!isReadOnlyMode}
        nodesDraggable={!isReadOnlyMode}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onNodesChange={handleOnNodesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        onBeforeDelete={onBeforeDelete}
        onSelectionChange={handleOnSelectionChange}
        minZoom={0.1}
        snapToGrid={SNAP_IS_ACTIVE}
        snapGrid={SNAP_GRID}
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
        deleteKeyCode={deleteKeyCode}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
      </div>
      <ModalProvider />
    </>
  );
}

export const DiagramContainer = DiagramContainerComponent;
