import { SnackbarType } from '@synergycodes/overflow-ui';

import { showSnackbar } from '@/utils/show-snackbar';

import { setStoreDataFromIntegration } from '@/store/slices/diagram-slice/actions';

import { useSavingStore } from '@/features/save-flow/stores/use-saving-store';

import type { IntegrationDataFormatOptional } from '../types';

export function loadDiagramData(data: IntegrationDataFormatOptional) {
  const hasAnyData = Object.values(data).some(Boolean);

  if (hasAnyData) {
    setStoreDataFromIntegration(data);

    showSnackbar({
      title: 'Diagram loaded successfully',
      variant: SnackbarType.SUCCESS,
    });
  }

  useSavingStore.setState({
    savingStatus: 'waiting',
    lastSaveAttemptTimestamp: Date.now(),
  });
}
