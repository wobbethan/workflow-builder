import { Button, SnackbarType } from '@synergycodes/overflow-ui';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

import { Icon } from '@workflow-builder/icons';

import styles from './import-modal.module.css';

import { formatMessage } from '@/utils/format-message';
import { showSnackbar } from '@/utils/show-snackbar';

import { setStoreDataFromIntegration } from '@/store/slices/diagram-slice/actions';

import { trackFutureChange } from '@/widgets/changes-tracker/stores/use-changes-tracker-store';
import { closeModal } from '@/features/modals/stores/use-modal-store';
import { SyntaxHighlighterLazy } from '@/widgets/syntax-highlighter/components/syntax-highlighter-lazy';

import { type IntegrationDataError, validateIntegrationData } from '../utils/validate-integration-data';

export function ImportModal() {
  const [jsonToParse, setJsonToParse] = useState('{}');
  const [{ errors, warnings }, setJsonValidation] = useState<{
    errors: IntegrationDataError[];
    warnings: IntegrationDataError[];
  }>({
    errors: [],
    warnings: [],
  });

  const handleImport = useCallback(
    ({ shouldIgnoreWarnings }: { shouldIgnoreWarnings: boolean }) => {
      const { errors, warnings, validatedIntegrationData } = validateIntegrationData(jsonToParse);

      setJsonValidation({
        errors,
        warnings,
      });

      if (errors.length > 0) {
        return;
      }

      if (warnings.length > 0 && shouldIgnoreWarnings === false) {
        return;
      }

      if (validatedIntegrationData) {
        trackFutureChange('import');
        setStoreDataFromIntegration(validatedIntegrationData);
        closeModal();

        showSnackbar({
          title: 'The diagram was loaded successfully',
          variant: SnackbarType.SUCCESS,
        });
      }
    },
    [jsonToParse],
  );

  return (
    <div className={styles['container']}>
      <p className={clsx('ax-public-p10', styles['tip'])}>
        The simplest way to see the expected schema is to create a diagram and export it.
      </p>
      <SyntaxHighlighterLazy value={jsonToParse} onChange={(json) => setJsonToParse(json || '{}')} />
      {(errors.length > 0 || warnings.length > 0) && (
        <div className={clsx('ax-public-p10', styles['error'])}>
          {[...errors, ...warnings].map(({ message, messageParams }) => (
            <div key={message}>{formatMessage(message, messageParams)}</div>
          ))}
        </div>
      )}
      <div className={styles['actions']}>
        {warnings.length > 0 && errors.length === 0 && (
          <Button variant="warning" onClick={() => handleImport({ shouldIgnoreWarnings: true })}>
            <Icon name="DownloadSimple" />
            Ignore and import
          </Button>
        )}
        <Button variant="primary" onClick={() => handleImport({ shouldIgnoreWarnings: false })}>
          <Icon name="DownloadSimple" />
          Import
        </Button>
      </div>
    </div>
  );
}
