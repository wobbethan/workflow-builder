import { Button, Checkbox } from '@synergycodes/overflow-ui';
import { Edge, Node } from '@xyflow/react';
import { useState } from 'react';

import styles from './delete-confirmation.module.css';

import { t } from '@/features/i18n/t';

type DeleteConfirmationProps = {
  nodes: Node[];
  edges: Edge[];
  onShouldShowAgainChange?: (value: boolean) => void;
};

export function DeleteConfirmation({ nodes, edges, onShouldShowAgainChange }: DeleteConfirmationProps) {
  const [isChecked, setIsChecked] = useState(false);

  const parts = [
    nodes.length > 0 ? t(`deleteConfirmation.${nodes.length > 1 ? 'nodes' : 'node'}`) : '',
    edges.length > 0 ? t(`deleteConfirmation.${edges.length > 1 ? 'edges' : 'edge'}`) : '',
  ].filter(Boolean);

  function handleChange() {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onShouldShowAgainChange?.(newValue);
  }

  const translatedParts = parts.join(` ${t('deleteConfirmation.andConnected')} `);
  const selectedText = t(`deleteConfirmation.${nodes.length > 1 ? 'selectedPlural' : 'selected'}`);

  return (
    <div className={styles['content']}>
      <span>
        You&apos;re about to <b>permanently delete</b> {selectedText} {translatedParts}. Please, confirm to proceed.
      </span>
      <div className={styles['checkbox-wrapper']}>
        <Checkbox id="dont-show-again-checkbox" size="small" checked={isChecked} onChange={handleChange} />
        <label htmlFor="dont-show-again-checkbox">{t('deleteConfirmation.dontShowMeThisAgain')}</label>
      </div>
    </div>
  );
}

type DeleteConfirmationButtonsProps = {
  onDeleteClick: () => void;
  onCancelClick: () => void;
};

export function DeleteConfirmationButtons({ onDeleteClick, onCancelClick }: DeleteConfirmationButtonsProps) {
  return (
    <div className={styles['buttons']}>
      <Button variant="secondary" onClick={onCancelClick}>
        {t('deleteConfirmation.cancel')}
      </Button>
      <Button onClick={onDeleteClick} size="medium" variant="error" autoFocus>
        {t('deleteConfirmation.delete')}
      </Button>
    </div>
  );
}
