import { PaletteItem } from '@/shared/types/common';
import { NodeType } from '@/shared/types/node-types';

import useStore from '@/store/store';

import { DecisionNodeTemplate } from '@/widgets/diagram/nodes/decision-node-template/decision-node-template';
import { StartNodeTemplate } from '@/widgets/diagram/nodes/start-node-template/start-node-template';
import { WorkflowNodeTemplate } from '@/widgets/diagram/nodes/workflow-node-template/workflow-node-template';

const NODE_TEMPLATES = {
  [NodeType.Node]: WorkflowNodeTemplate,
  [NodeType.StartNode]: StartNodeTemplate,
  [NodeType.DecisionNode]: DecisionNodeTemplate,
};

type NodePreviewContainerProps = {
  type: string;
};

export function NodePreviewContainer({ type }: NodePreviewContainerProps) {
  const getNodeDefinition = useStore((state) => state.getNodeDefinition);

  const nodeDefinition = getNodeDefinition(type);
  if (!nodeDefinition) {
    return;
  }

  return <NodePreview nodeDefinition={nodeDefinition} />;
}

type NodePreviewProps = {
  nodeDefinition: PaletteItem;
};

function NodePreview({ nodeDefinition }: NodePreviewProps) {
  const { icon, label, description, templateType = NodeType.Node } = nodeDefinition;

  const TemplateComponent = NODE_TEMPLATES[templateType] || NODE_TEMPLATES[NodeType.Node];

  return <TemplateComponent icon={icon} label={label} description={description} showHandles={false} id={''} />;
}
