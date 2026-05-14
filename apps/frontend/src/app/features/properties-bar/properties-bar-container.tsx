import { useEffect, useMemo, useState } from 'react';

import { useSingleSelectedElement } from '@/features/properties-bar/use-single-selected-element';

import { useRemoveElements } from '@/hooks/use-remove-elements';

import { t } from '@/features/i18n/t';

import { PropertiesBar } from './components/properties-bar/properties-bar';

export function PropertiesBarContainer() {
  const { removeElements } = useRemoveElements();

  const [selectedTab, setSelectedTab] = useState('properties');

  const selection = useSingleSelectedElement();
  const selectionId = useMemo(() => selection?.node?.id, [selection]);

  useEffect(() => {
    setSelectedTab('properties');
  }, [selectionId]);

  function handleDeleteClick() {
    if (selection) {
      removeElements(selection);
    }
  }

  return (
    <PropertiesBar
      selection={selection}
      onDeleteClick={handleDeleteClick}
      headerLabel={t('propertiesBar.label')}
      deleteNodeLabel={t('propertiesBar.deleteNode')}
      deleteEdgeLabel={t('propertiesBar.deleteEdge')}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
    />
  );
}
