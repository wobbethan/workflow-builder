import { NavButton } from '@synergycodes/overflow-ui';

import { Icon } from '@workflow-builder/icons';

type Props = {
  header: string;
  name: string;
  hasSelection: boolean;
  isExpendable: boolean;
  onTogglePropertiesBar: () => void;
  onDotsClick?: () => void;
};

export function PropertiesBarHeader({
  onTogglePropertiesBar,
  isExpendable: isPropertiesBarOpen,
  header,
  hasSelection,
  name,
  onDotsClick,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <NavButton
        size="small"
        onClick={onTogglePropertiesBar}
        tooltip={isPropertiesBarOpen ? 'Close properties bar' : 'Open properties bar'}
        disabled={!hasSelection}
      >
        <Icon name="SidebarSimple" />
      </NavButton>
      <div className="flex grow flex-col">
        <span className={name ? 'ax-public-h9' : 'ax-public-h7'}>{header}</span>
        {name && (
          <p className="ax-public-p11 m-0 line-clamp-2 overflow-hidden">{name}</p>
        )}
      </div>
      {onDotsClick && (
        <NavButton size="small" onClick={onDotsClick}>
          <Icon name="DotsThreeVertical" />
        </NavButton>
      )}
    </div>
  );
}
