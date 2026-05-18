import { Button, SnackbarType } from '@synergycodes/overflow-ui';
import { useCallback, useMemo } from 'react';

import { Icon } from '@workflow-builder/icons';

import styles from './export-modal.module.css';

import { copy } from '@/utils/copy';
import { noop } from '@/utils/noop';
import { showSnackbar } from '@/utils/show-snackbar';

import { getStoreDataForIntegration } from '@/store/slices/diagram-slice/actions';

import { SyntaxHighlighterLazy } from '@/widgets/syntax-highlighter/components/syntax-highlighter-lazy';

export function ExportModal() {
  const storeData = useMemo(() => {
    return JSON.stringify(getStoreDataForIntegration(), null, 2);
  }, []);

  const handleCopy = useCallback(() => {
    copy(storeData);

    showSnackbar({
      title: 'Content copied to clipboard',
      variant: SnackbarType.SUCCESS,
    });
  }, [storeData]);

  return (
    <div className={styles['container']}>
      <SyntaxHighlighterLazy value={storeData} onChange={noop} isDisabled />
      <div className={styles['actions']}>
        <Button variant="primary" onClick={handleCopy}>
          <Icon name="Copy" />
          Copy
        </Button>
      </div>
    </div>
  );
}
