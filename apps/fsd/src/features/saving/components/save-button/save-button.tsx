import { NavButton } from '@synergycodes/overflow-ui';
import { useContext } from 'react';

import { Icon } from '@workflow-builder/icons';

import { SavingContext } from '../../context/saving-context-wrapper';
import { useAutoSave } from '../../hooks/use-auto-save';
import { useAutoSaveOnClose } from '../../hooks/use-auto-save-on-close';
import { SavingStatus } from '../saving-status/saving-status';

export function SaveButton() {
  const { onSave } = useContext(SavingContext);

  function handleSave() {
    onSave({ isAutoSave: false });
  }

  useAutoSave();
  useAutoSaveOnClose();

  return (
    <NavButton onClick={handleSave} tooltip="Save">
      <>
        <SavingStatus />
        <Icon name="FloppyDisk" />
      </>
    </NavButton>
  );
}
