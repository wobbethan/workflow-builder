import { DotsThreeVertical } from '@phosphor-icons/react';
import { Menu, MenuItemProps, NavButton } from '@synergycodes/overflow-ui';
import { useMemo } from 'react';

import styles from '../../app-bar.module.css';

import { OptionalAppBarControls } from '@/features/plugins-core/components/app/optional-app-bar-controls';

import { t } from '@/features/i18n/t';

import { getControlsDotsItems } from '../../functions/get-controls-dots-items';
import { ToggleDarkMode } from '../toggle-dark-mode/toggle-dark-mode';
import { ToggleReadyOnlyMode } from '../toggle-read-only-mode/toggle-read-only-mode';

export function Controls() {
  const items: MenuItemProps[] = useMemo(() => getControlsDotsItems(), []);

  return (
    <div className={styles['controls']}>
      <OptionalAppBarControls>
        <ToggleReadyOnlyMode />
        <ToggleDarkMode />
      </OptionalAppBarControls>
      {items.length > 0 && (
        <div className={styles['menu-container']}>
          <Menu items={items}>
            <NavButton tooltip={t('tooltips.menu')}>
              <DotsThreeVertical />
            </NavButton>
          </Menu>
        </div>
      )}
    </div>
  );
}
