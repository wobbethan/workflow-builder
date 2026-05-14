import ELK from 'elkjs/lib/elk.bundled.js';
import type { ElkNode } from 'elkjs/lib/elk-api';

import type { LayoutDirection } from '@workflow-builder/types/common';
import type { WorkflowBuilderEdge, WorkflowBuilderNode } from '@workflow-builder/types/node-data';

import { setStoreNodes } from '@/store/slices/diagram-slice/actions';

import useStore from '@/store/store';

import { trackFutureChange } from '@/features/changes-tracker/stores/use-changes-tracker-store';

import { buildElkGraph } from './build-elk-graph';

const elk = new ELK();

function mergeLayoutIntoNodes(
  nodes: WorkflowBuilderNode[],
  layoutedRoot: ElkNode,
): WorkflowBuilderNode[] {
  const positioned = new Map<string, { x: number; y: number }>();
  for (const child of layoutedRoot.children ?? []) {
    if (child.id !== undefined && child.x !== undefined && child.y !== undefined) {
      positioned.set(child.id, { x: child.x, y: child.y });
    }
  }

  return nodes.map((node) => {
    const next = positioned.get(node.id);
    if (!next) {
      return node;
    }
    return {
      ...node,
      position: { x: next.x, y: next.y },
      dragging: false,
    };
  });
}

export type RunElkLayoutParams = {
  nodes: WorkflowBuilderNode[];
  edges: WorkflowBuilderEdge[];
  layoutDirection: LayoutDirection;
};

/**
 * Runs ELK layered layout and writes node positions to the store, then fits the viewport.
 */
export async function runElkAutoLayout({ nodes, edges, layoutDirection }: RunElkLayoutParams): Promise<void> {
  if (nodes.length === 0) {
    return;
  }

  const graph = buildElkGraph(nodes, edges, layoutDirection);
  const layouted = await elk.layout(graph);
  const nextNodes = mergeLayoutIntoNodes(nodes, layouted);
  trackFutureChange('autoLayout');
  setStoreNodes(nextNodes);

  const { reactFlowInstance } = useStore.getState();
  reactFlowInstance?.fitView({ maxZoom: 1, padding: 0.2 });
}
