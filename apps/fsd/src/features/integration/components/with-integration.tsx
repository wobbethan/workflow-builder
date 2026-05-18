import { useCallback, useEffect, useState } from 'react';

import { getStoreDataForIntegration } from '@/store/slices/diagram-slice/actions';

import type { OnSave } from '@/features/saving/types';
import { showSnackbarSaveErrorIfNeeded, showSnackbarSaveSuccessIfNeeded } from '@/features/saving/utils/show-snackbar-save';

import { fetchDiagram, saveDiagram } from '../api/diagram-api';
import type { IntegrationDataFormatOptional } from '../types';
import { IntegrationWrapper } from './integration-wrapper';

export function withIntegration<WProps extends object>(WrappedComponent: React.ComponentType<WProps>) {
  function WithIntegrationComponent(props: React.ComponentProps<typeof WrappedComponent>) {
    const handleSave: OnSave = useCallback(async (savingParams) => {
      const data = getStoreDataForIntegration();

      try {
        const didSave = await saveDiagram(data);

        if (didSave) {
          showSnackbarSaveSuccessIfNeeded(savingParams);

          return 'success';
        }
      } catch {
        //
      }

      showSnackbarSaveErrorIfNeeded(savingParams);

      return 'error';
    }, []);

    const [{ name, layoutDirection, nodes, edges }, setData] = useState<IntegrationDataFormatOptional>({});

    useEffect(() => {
      (async () => {
        try {
          const data = await fetchDiagram();

          if (data) {
            setData(data);
          }
        } catch {
          //
        }
      })();
    }, []);

    return (
      <IntegrationWrapper name={name} layoutDirection={layoutDirection} nodes={nodes} edges={edges} onSave={handleSave}>
        <WrappedComponent {...props} />
      </IntegrationWrapper>
    );
  }

  return WithIntegrationComponent;
}
