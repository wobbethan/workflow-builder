import { Asterisk } from '@phosphor-icons/react';
import { ItemSize } from '@synergycodes/overflow-ui';
import clsx from 'clsx';

export type LabelProps = {
  label: string;
  required?: boolean;
  size?: ItemSize;
};

export function Label({ label, required, size = 'medium' }: LabelProps) {
  return (
    <span
      className={clsx(
        'flex items-center gap-1 text-[var(--ax-public-form-label-color)]',
        size === 'large' ? 'ax-public-p10' : 'ax-public-p11',
      )}
    >
      {required && (
        <Asterisk className="h-2.5 w-2.5 min-w-2.5 shrink-0 text-[var(--ax-public-form-label-asterisk-color)]" />
      )}
      <span className="w-full truncate whitespace-nowrap">{label}</span>
    </span>
  );
}
