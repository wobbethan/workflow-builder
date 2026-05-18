'use client';

import { ReactFlowProvider } from '@xyflow/react';
import { setAutoFreeze } from 'immer';
import { PropsWithChildren } from 'react';

import { AppLoaderContainer, withIntegration } from '@/features/integration';
import { PaletteContainerLazy } from '@/widgets/palette';
import { AppBarContainerLazy } from '@/widgets/app-bar/app-bar-container-lazy';
import { DiagramContainer as Diagram } from '@/widgets/diagram/diagram';
import { DiagramWrapper } from '@/widgets/diagram/diagram-wrapper';
import { PropertiesBarContainerLazy } from '@/widgets/properties-bar/properties-bar-container-lazy';
import { SnackbarContainer } from '@/widgets/snackbar/snackbar-container';

function WorkflowBuilderPageComponent(_props: PropsWithChildren) {
  // Disable immer's automatic object freezing because ReactFlow mutates objects under the hood
  // and requires this to be turned off to function properly, especially when node size is updated
  setAutoFreeze(false);

  return (
    <ReactFlowProvider>
      <div className="workflow-builder-root absolute flex h-full w-full flex-col overflow-hidden">
        <div className="pointer-events-none z-10 box-border flex w-full justify-between gap-4 p-4">
          <AppBarContainerLazy />
        </div>
        <div className="relative box-border flex h-full w-full justify-between overflow-hidden px-4 pb-4 pt-0">
          <div className="pointer-events-none z-1 flex h-full">
            <PaletteContainerLazy />
          </div>
          <div id="viewport-bounds" className="invisible flex-1" />
          <div className="pointer-events-none z-1 flex h-full min-h-0">
            <div className="flex h-full min-h-0 flex-col items-end justify-end">
              <PropertiesBarContainerLazy />
            </div>
          </div>
        </div>
        <DiagramWrapper>
          <Diagram />
        </DiagramWrapper>
        <SnackbarContainer />
        <AppLoaderContainer />
      </div>
    </ReactFlowProvider>
  );
}

type WorkflowBuilderPageProps = React.ComponentProps<typeof WorkflowBuilderPageComponent>;

const WorkflowBuilder = withIntegration<WorkflowBuilderPageProps>(WorkflowBuilderPageComponent);

export function WorkflowBuilderPage() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <WorkflowBuilder />
    </div>
  );
}
