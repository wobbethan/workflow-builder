import { ItemSize } from '@synergycodes/overflow-ui';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Label } from '../label/label';

type Props = {
  label: string;
  className?: string;
  required?: boolean;
  size?: ItemSize;
};

export function FormControlWithLabel({
  label,
  className,
  required,
  size = 'medium',
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <Label label={label} required={required} size={size} />
      {children}
    </div>
  );
}
