import { NavButton } from '@synergycodes/overflow-ui';

import { Icon } from '@workflow-builder/icons';

import styles from './palette-header.module.css';

import { t } from '@/features/i18n/t';

type PaletteHeaderProps = {
  onClick: () => void;
  isSidebarExpanded: boolean;
};

export function PaletteHeader({ onClick, isSidebarExpanded }: PaletteHeaderProps) {
  return (
    <div className={styles['container']}>
      <span className="ax-public-h7">{t('palette.nodesLibrary')}</span>
      <NavButton
        size="small"
        onClick={onClick}
        tooltip={isSidebarExpanded ? t('tooltips.closePalette') : t('tooltips.openPalette')}
      >
        <Icon name="SidebarSimple" />
      </NavButton>
    </div>
  );
}
