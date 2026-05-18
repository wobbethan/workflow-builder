import { Separator } from '@synergycodes/overflow-ui';
import clsx from 'clsx';

import './variables.css';

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  isExpanded: boolean;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
};

export function Sidebar({ isExpanded, children, className, header, footer, contentClassName, ...props }: SidebarProps) {
  return (
    <div
      className={clsx(
        'pointer-events-auto relative flex h-min w-auto min-h-0 flex-col items-stretch justify-between rounded-[var(--wb-sidebar-border-radius)] border border-[var(--wb-sidebar-border-color)] bg-[var(--wb-sidebar-background)] py-[var(--wb-sidebar-vertical-padding)] text-[var(--wb-sidebar-text-color)]',
        isExpanded && 'box-border h-full w-[var(--wb-sidebar-expanded-width)]',
        className,
      )}
      {...props}
    >
      <div className="mb-[var(--wb-sidebar-content-gap)] box-border flex w-full flex-col gap-4 px-[var(--wb-sidebar-horizontal-padding)] last:mb-0">
        {header}
      </div>
      {isExpanded && (
        <>
          <Separator />
          <div
            className={clsx(
              'box-border flex-1 overflow-x-hidden overflow-y-auto px-[var(--wb-sidebar-horizontal-padding)] py-[var(--wb-sidebar-content-gap)]',
              contentClassName,
            )}
          >
            {children}
          </div>
          {footer && (
            <>
              <Separator />
              <div className="mt-[var(--wb-sidebar-content-gap)] box-border flex w-full flex-col px-[var(--wb-sidebar-horizontal-padding)]">
                {footer}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
