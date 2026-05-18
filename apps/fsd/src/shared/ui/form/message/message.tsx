import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Icon } from '@workflow-builder/icons';

type Props = {
  className?: string;
  variant?: 'neutral' | 'warning' | 'error';
};

export function Message({ className = '', variant = 'neutral', children }: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        'flex gap-[var(--wb-message-control-spacing)] rounded-[var(--wb-message-control-border-radius)] p-[var(--wb-message-control-padding)] [&_svg]:shrink-0',
        variant === 'neutral' && 'bg-[var(--wb-ui-bg-secondary-default)] text-[var(--wb-colors-gray-800)]',
        variant === 'warning' && 'bg-[var(--wb-chips-acc5-bg)] text-[var(--wb-chips-acc5-txt)]',
        variant === 'error' &&
          'bg-[var(--ax-public-snackbar-error-background)] text-[var(--ax-public-snackbar-title-color)]',
        className,
      )}
    >
      <Icon name={variant === 'neutral' ? 'Info' : 'Warning'} />
      <div className="ax-public-p11 pt-px">{children}</div>
    </div>
  );
}
