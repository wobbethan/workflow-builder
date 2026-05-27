import { PropsWithChildren, useEffect } from 'react';

import { SavingContextWrapper } from '@/features/save-flow/context/saving-context-wrapper';
import type { OnSave } from '@/features/save-flow/types';

import type { IntegrationDataFormatOptional } from '../types';
import { loadDiagramData } from '../utils/load-diagram-data';

type Props = PropsWithChildren<
  IntegrationDataFormatOptional & {
    onSave: OnSave;
  }
>;

export function IntegrationWrapper({ children, name, layoutDirection, nodes, edges, onSave }: Props) {
  useEffect(() => {
    loadDiagramData({
      name,
      layoutDirection,
      nodes,
      edges,
    });
  }, [edges, layoutDirection, name, nodes]);

  return <SavingContextWrapper onSave={onSave}>{children}</SavingContextWrapper>;
}
