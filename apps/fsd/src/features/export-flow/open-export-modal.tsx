import { Export } from '@phosphor-icons/react';

import { openModal } from '@/features/modals/stores/use-modal-store';

import { ExportModal } from './components/export-modal';

export function openExportModal() {
  openModal({
    content: <ExportModal />,
    icon: <Export />,
    title: 'Export',
  });
}
