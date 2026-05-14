import { Button } from '@synergycodes/overflow-ui';

import { t } from '@/features/i18n/t';

type Props = {
  closeModal: () => void;
  handleConfirm: () => void;
};

export function ConditionModalFooter({ closeModal, handleConfirm }: Props) {
  return (
    <>
      <Button variant="secondary" onClick={closeModal} type="button">
        {t('conditions.cancel')}
      </Button>
      <Button onClick={handleConfirm}>{t('conditions.confirm')}</Button>
    </>
  );
}
