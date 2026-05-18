import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ label: string }>;

export function NodeSection({ label, children }: Props) {
  return (
    <div className="ax-public-h10 flex flex-col gap-3 rounded-lg border border-[var(--ax-ui-stroke-primary-default)] p-2.5 text-[var(--ax-txt-primary-default)]">
      {label && <span>{label}</span>}
      {children}
    </div>
  );
}
