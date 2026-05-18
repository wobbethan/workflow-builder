import { DotsThreeVertical } from '@phosphor-icons/react';
import { Menu, MenuItemProps, NavButton } from '@synergycodes/overflow-ui';
import { useMemo } from 'react';

import { LayoutControlsCluster } from '@/features/auto-layout';

import { appBarClasses } from '../../app-bar-classes';
import { getControlsDotsItems } from '../../functions/get-controls-dots-items';
import { ToggleDarkMode } from '../toggle-dark-mode/toggle-dark-mode';
import { ToggleReadyOnlyMode } from '../toggle-read-only-mode/toggle-read-only-mode';

export function Controls() {
  const items: MenuItemProps[] = useMemo(() => getControlsDotsItems(), []);

  return (
    <div className={appBarClasses.controls}>
      <ToggleReadyOnlyMode />
      <ToggleDarkMode />
      <LayoutControlsCluster />
      {items.length > 0 && (
        <div className={appBarClasses.menuContainer}>
          <Menu items={items}>
            <NavButton tooltip="Menu">
              <DotsThreeVertical />
            </NavButton>
          </Menu>
        </div>
      )}
    </div>
  );
}
