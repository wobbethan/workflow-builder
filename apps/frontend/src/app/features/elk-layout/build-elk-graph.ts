import type { ElkExtendedEdge, ElkNode } from 'elkjs/lib/elk-api';

import type { LayoutDirection } from '@workflow-builder/types/common';
import type { WorkflowBuilderEdge, WorkflowBuilderNode } from '@workflow-builder/types/node-data';

import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from './constants';

function getNodeDimensions(node: WorkflowBuilderNode): { width: number; height: number } {
  const width = node.measured?.width ?? node.width ?? DEFAULT_NODE_WIDTH;
  const height = node.measured?.height ?? node.height ?? DEFAULT_NODE_HEIGHT;
  return {
    width: Math.max(1, width),
    height: Math.max(1, height),
  };
}

function elkDirection(layoutDirection: LayoutDirection): 'RIGHT' | 'DOWN' {
  return layoutDirection === 'DOWN' ? 'DOWN' : 'RIGHT';
}

/**
 * Builds an ELK root graph from the current React Flow nodes and edges.
 * Self-loop edges are omitted from the ELK graph (ELK layered can reject them); nodes are still laid out.
 */
export function buildElkGraph(
  nodes: WorkflowBuilderNode[],
  edges: WorkflowBuilderEdge[],
  layoutDirection: LayoutDirection,
): ElkNode {
  const children: ElkNode[] = nodes.map((node) => {
    const { width, height } = getNodeDimensions(node);
    return {
      id: node.id,
      width,
      height,
    };
  });

  const elkEdges: ElkExtendedEdge[] = edges
    .filter((edge) => edge.source !== edge.target)
    .map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    }));

  return {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': elkDirection(layoutDirection),
      'elk.spacing.nodeNode': '48',
      'elk.layered.spacing.nodeNodeBetweenLayers': '72',
    },
    children,
    edges: elkEdges,
  };
}
