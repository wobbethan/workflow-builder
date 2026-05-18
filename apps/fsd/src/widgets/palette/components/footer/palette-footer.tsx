import { Button } from '@synergycodes/overflow-ui';

import styles from './palette-footer.module.css';

import useStore from '@/store/store';

type Props = {
  onTemplateClick: () => void;
};

export function PaletteFooter({ onTemplateClick }: Props) {
  const isReadOnly = useStore((store) => store.isReadOnlyMode);

  return (
    <div className={styles['container']}>
      <Button disabled={isReadOnly} variant="secondary" onClick={onTemplateClick} size="small">
        Templates
      </Button>
    </div>
  );
}
