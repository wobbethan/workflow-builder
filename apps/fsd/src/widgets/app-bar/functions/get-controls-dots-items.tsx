import { MenuItemProps } from '@synergycodes/overflow-ui';

import { Icon } from '@workflow-builder/icons';

import { openExportModal } from '@/features/export';
import { openImportModal } from '@/features/import';

export function getControlsDotsItems(): MenuItemProps[] {
  return [
    {
      label: 'Export',
      icon: <Icon name="Export" />,
      onClick: openExportModal,
    },
    {
      label: 'Import',
      icon: <Icon name="DownloadSimple" />,
      onClick: openImportModal,
    },
  ];
}
