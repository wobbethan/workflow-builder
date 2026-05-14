import { Icon } from '@workflow-builder/icons';

import useStore from '@/store/store';

import { t } from '@/features/i18n/t';

import { openModal } from '@/features/modals/stores/use-modal-store';

import { TemplateSelector } from './template-selector';

export function openTemplateSelectorModal() {
  openModal({
    content: <TemplateSelector />,
    icon: <Icon name="Cube" />,
    title: t('templateSelector.title'),
    onModalClosed: () => useStore.getState().setDiagramModel(undefined, { skipIfNotEmpty: true }),
  });
}
