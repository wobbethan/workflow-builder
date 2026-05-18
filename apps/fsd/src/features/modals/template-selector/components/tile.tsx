import clsx from 'clsx';

import { Icon } from '@workflow-builder/icons';
import { IconType } from '@/shared/types/common';

type TileProps = {
  icon: IconType;
  title: string;
  subTitle?: string;
  outlined?: boolean;
  onClick: () => void;
};

export function Tile({ icon, title, subTitle, outlined, onClick }: TileProps) {
  return (
    <div
      className={clsx(
        'flex w-[140px] cursor-pointer flex-col items-start gap-4 rounded-md p-3 outline outline-1 outline-transparent transition-[outline,color] duration-[var(--wb-transition)]',
        'bg-[var(--ax-ui-bg-secondary-default)] [&_svg]:text-[var(--ax-txt-primary-default)] [&_svg]:transition-[color]',
        'hover:outline-[var(--ax-colors-acc1-500)] hover:[&_svg]:text-[var(--ax-colors-acc1-500)]',
        outlined && 'bg-transparent outline-[var(--ax-colors-gray-400)]',
      )}
      onClick={() => onClick()}
    >
      <Icon name={icon} size="large" />
      <div className="flex w-full flex-col items-start gap-1">
        <span className="ax-public-p10 text-[var(--ax-txt-primary-default)]">{title}</span>
        {subTitle && <span className="ax-public-p10 text-[var(--ax-colors-gray-500)]">{subTitle}</span>}
      </div>
    </div>
  );
}
