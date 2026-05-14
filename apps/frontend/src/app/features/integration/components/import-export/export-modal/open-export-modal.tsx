import { Icon } from '@workflow-builder/icons';

import { t } from '@/features/i18n/t';

import { openModal } from '@/features/modals/stores/use-modal-store';

import { ExportModal } from './export-modal';

export function openExportModal() {
  openModal({
    content: <ExportModal />,
    icon: <Icon name="Export" />,
    title: t('importExport.export'),
  });
}
