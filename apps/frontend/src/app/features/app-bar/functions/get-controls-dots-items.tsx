import { MenuItemProps } from '@synergycodes/overflow-ui';

import { Icon } from '@workflow-builder/icons';

import { withOptionalFunctionPlugins } from '@/features/plugins-core/adapters/adapter-functions';
import { t } from '@/features/i18n/t';

import { openExportModal } from '@/features/integration/components/import-export/export-modal/open-export-modal';
import { openImportModal } from '@/features/integration/components/import-export/import-modal/open-import-modal';

function getControlsDotsItemsFunction(): MenuItemProps[] {
  return [
    {
      label: t('importExport.export'),
      icon: <Icon name="Export" />,
      onClick: openExportModal,
    },
    {
      label: t('importExport.import'),
      icon: <Icon name="DownloadSimple" />,
      onClick: openImportModal,
    },
  ];
}

export const getControlsDotsItems = withOptionalFunctionPlugins(getControlsDotsItemsFunction, 'getControlsDotsItems');
