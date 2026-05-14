import { Icon } from '@workflow-builder/icons';

import { t } from '@/features/i18n/t';

import { openModal } from '@/features/modals/stores/use-modal-store';

import { ImportModal } from './import-modal';

export function openImportModal() {
  openModal({
    content: <ImportModal />,
    icon: <Icon name="DownloadSimple" />,
    title: t('importExport.import'),
  });
}
