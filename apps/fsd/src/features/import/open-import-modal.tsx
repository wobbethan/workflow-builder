import { DownloadSimple } from '@phosphor-icons/react';

import { openModal } from '@/features/modals/stores/use-modal-store';

import { ImportModal } from './components/import-modal';

export function openImportModal() {
  openModal({
    content: <ImportModal />,
    icon: <DownloadSimple />,
    title: 'Import',
  });
}
