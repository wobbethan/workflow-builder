import { useEffect, useMemo, useState } from 'react';

import { useSingleSelectedElement } from '@/widgets/properties-bar/use-single-selected-element';

import { useRemoveElements } from '@/shared/hooks/use-remove-elements';

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
    <div className="h-full w-full min-h-0">
      <PropertiesBar
        selection={selection}
        onDeleteClick={handleDeleteClick}
        headerLabel="Properties"
        deleteNodeLabel="Delete node"
        deleteEdgeLabel="Delete edge"
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
    </div>
  );
}
