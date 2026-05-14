import { Button } from '@synergycodes/overflow-ui';

import styles from './palette-footer.module.css';

import useStore from '@/store/store';

import { t } from '@/features/i18n/t';

import { OptionalFooterContent } from '@/features/plugins-core/components/app/optional-footer-content';

type Props = {
  onTemplateClick: () => void;
};

export function PaletteFooter({ onTemplateClick }: Props) {
  const isReadOnly = useStore((store) => store.isReadOnlyMode);

  return (
    <div className={styles['container']}>
      <OptionalFooterContent>
        <Button disabled={isReadOnly} variant="secondary" onClick={onTemplateClick} size="small">
          {t('palette.templates')}
        </Button>
      </OptionalFooterContent>
    </div>
  );
}
