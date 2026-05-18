import { Button, SegmentPicker } from '@synergycodes/overflow-ui';
import clsx from 'clsx';
import { useState } from 'react';

import { Sidebar } from '@/ui/sidebar/sidebar';

import '../../properties-bar-variables.css';

import { EdgeProperties } from '../edge-properties/edge-properties';
import { PropertiesBarHeader } from '../header/properties-bar-header';
import { NodeProperties } from '../node-properties/node-properties';
import { PropertiesBarItem, PropertiesBarProps } from './properties-bar.types';
import { renderComponent } from './render-component';

/**
 * PropertiesBarComponent - A configurable sidebar component for displaying and editing
 * properties of selected workflow elements (nodes and edges).
 */
function PropertiesBarComponent({
  selection,
  onMenuHeaderClick,
  onDeleteClick,
  headerLabel,
  deleteNodeLabel,
  deleteEdgeLabel,
  selectedTab,
  onTabChange,
  tabs = [],
}: PropertiesBarProps) {
  const [isPropertiesBarOpen, setIsPropertiesBarOpen] = useState(true);

  const name = selection?.node?.data?.properties?.label ?? selection?.edge?.data?.label;
  const hasSelection = !!selection;
  const isExpanded = hasSelection && isPropertiesBarOpen;
  const hasCustomItems = tabs.length > 0;

  const segmentPicker = {
    when: () => isExpanded && !!selection?.node && selection.node.type === 'node' && hasCustomItems,
    component: () => (
      <SegmentPicker size="xxx-small" value={selectedTab} onChange={(_, value) => onTabChange(value)}>
        {[
          <SegmentPicker.Item key="properties" value="properties">
            Properties
          </SegmentPicker.Item>,
          ...tabs.map(({ label, value }) => (
            <SegmentPicker.Item key={value} value={value}>
              {label}
            </SegmentPicker.Item>
          )),
        ]}
      </SegmentPicker>
    ),
  };

  const contentComponents: PropertiesBarItem[] = [
    {
      when: ({ selection, selectedTab }) => !!selection.node && selectedTab === 'properties',
      component: ({ selection }) => <NodeProperties node={selection.node!} />,
    },
    {
      when: ({ selection }) => !!selection.edge,
      component: ({ selection }) => <EdgeProperties edge={selection.edge!} />,
    },
    ...tabs.flatMap((tab) => tab.components),
  ];

  function onToggleExpand() {
    setIsPropertiesBarOpen(!isPropertiesBarOpen);
  }

  return (
    <Sidebar
      isExpanded={isExpanded}
      className={clsx(
        hasSelection && 'box-border h-full w-[var(--wb-properties-bar-width)]',
      )}
      contentClassName="-ml-4 min-h-0 w-[calc(100%+1rem)] flex-1 [&>*]:pl-4"
      header={
        <>
          <PropertiesBarHeader
            hasSelection={!!selection}
            isExpendable={isPropertiesBarOpen}
            onTogglePropertiesBar={onToggleExpand}
            header={headerLabel}
            name={name ?? ''}
            onDotsClick={onMenuHeaderClick}
          />
          {isExpanded && renderComponent([segmentPicker], selection, selectedTab)}
        </>
      }
      footer={
        isExpanded && (
          <Button onClick={onDeleteClick} variant="ghost-destructive">
            {selection?.node ? deleteNodeLabel : deleteEdgeLabel}
          </Button>
        )
      }
    >
      {isExpanded && renderComponent(contentComponents, selection, selectedTab)}
    </Sidebar>
  );
}

export const PropertiesBar = PropertiesBarComponent;
