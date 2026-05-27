import clsx from 'clsx';
import { DragEvent } from 'react';

import { PaletteItem as PaletteItemType } from '@/shared/types/common';

import { NodePreviewContainer } from '../../node-preview-container';

type PaletteItemProps = {
  item: PaletteItemType;
  onDragStart: (event: DragEvent) => void;
  onMouseDown: (type: string) => void;
  isDisabled?: boolean;
};

export function PaletteItem({ item, onDragStart, onMouseDown, isDisabled = false }: PaletteItemProps) {
  return (
    <div
      key={item.type}
      draggable={!isDisabled}
      className={clsx(
        'rounded-xl cursor-grab outline-offset-[-1px] outline outline-1 outline-transparent',
        {
          'cursor-default select-none opacity-50': isDisabled,
        }
      )}
      onMouseDown={() => onMouseDown(item.type)}
      onDragStart={onDragStart}
    >
      <NodePreviewContainer type={item.type} />
    </div>
  );
}
