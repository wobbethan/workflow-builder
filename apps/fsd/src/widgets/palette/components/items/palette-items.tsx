import { Accordion } from '@synergycodes/overflow-ui';
import { DragEvent } from 'react';

import { PaletteGroup, PaletteItem as PaletteItemType } from '@/shared/types/common';

import { PaletteItem } from './palette-item';

type PaletteItemsProps = {
  onDragStart: (event: DragEvent) => void;
  onMouseDown: (type: string) => void;
  items: (PaletteItemType | PaletteGroup)[];
  isDisabled?: boolean;
};

export function PaletteItems({ items, onDragStart, onMouseDown, isDisabled = false }: PaletteItemsProps) {
  return (
    <div className="flex flex-col gap-2 box-border">
      {items.map((itemOrGroup) => {
        const isGroup = Array.isArray((itemOrGroup as PaletteGroup)?.groupItems);

        if (isGroup) {
          const group = itemOrGroup as PaletteGroup;

          return (
            <Accordion
              key={group.label}
              className="[&_hr]:hidden"
              label={group.label}
              defaultOpen={group.isOpen}
            >
              <div className="flex flex-col gap-2 box-border">
                {group.groupItems.map((item) => (
                  <PaletteItem
                    key={item.type}
                    item={item}
                    isDisabled={isDisabled}
                    onMouseDown={onMouseDown}
                    onDragStart={onDragStart}
                  />
                ))}
              </div>
            </Accordion>
          );
        }

        const item = itemOrGroup as PaletteItemType;

        return (
          <PaletteItem
            key={item.type}
            item={item}
            isDisabled={isDisabled}
            onMouseDown={onMouseDown}
            onDragStart={onDragStart}
          />
        );
      })}
    </div>
  );
}
