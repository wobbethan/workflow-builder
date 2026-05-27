import { Button } from '@synergycodes/overflow-ui';

import useStore from '@/store/store';

type Props = {
  onTemplateClick: () => void;
};

export function PaletteFooter({ onTemplateClick }: Props) {
  const isReadOnly = useStore((store) => store.isReadOnlyMode);

  return (
    <div className="flex flex-col gap-2.5">
      <Button disabled={isReadOnly} variant="secondary" onClick={onTemplateClick} size="small">
        Templates
      </Button>
    </div>
  );
}
