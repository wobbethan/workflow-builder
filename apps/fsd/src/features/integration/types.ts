import { LayoutDirection } from '@/shared/types/common';
import { WorkflowBuilderEdge, WorkflowBuilderNode } from '@/shared/types/node-data';

export type IntegrationDataFormat = {
  name: string;
  layoutDirection: LayoutDirection;
  nodes: WorkflowBuilderNode[];
  edges: WorkflowBuilderEdge[];
};

export type IntegrationDataFormatOptional = Partial<IntegrationDataFormat>;
