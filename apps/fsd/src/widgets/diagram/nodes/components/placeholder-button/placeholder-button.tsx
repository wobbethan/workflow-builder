import { PlusCircle } from '@phosphor-icons/react';
import { Button } from '@synergycodes/overflow-ui';

type Props = {
  label: string;
} & Omit<React.ComponentProps<typeof Button>, 'children'>;

export function PlaceholderButton({ label, size = 'extra-small', ...props }: Props) {
  return (
    <Button className="border-dashed" size={size} variant="secondary" {...props}>
      <PlusCircle weight="bold" />
      {label}
    </Button>
  );
}
