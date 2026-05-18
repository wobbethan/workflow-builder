import { TemplateModel } from '@/shared/types/common';

import { snapToGridIfNeeded } from '@/utils/position-utils';

// Templates disabled temporarily — uncomment to restore pre-built workflow templates.
// import { blackFriday } from './templates/black-friday';
// import { callFlow } from './templates/call-flow';
// import { simpleFlow } from './templates/simple-flow';
// import { userRegistration } from './templates/user-registration';

function snapTemplateToGrid(template: TemplateModel) {
  return {
    ...template,
    value: {
      ...template.value,
      diagram: {
        ...template.value.diagram,
        nodes: template.value.diagram.nodes.map((node) => ({
          ...node,
          ...(node.position ? { position: snapToGridIfNeeded(node.position) } : {}),
        })),
      },
    },
  };
}

function getTemplates(): TemplateModel[] {
  // return [simpleFlow, userRegistration, blackFriday, callFlow];
  return [];
}

export const templates: TemplateModel[] = getTemplates().map(snapTemplateToGrid);
