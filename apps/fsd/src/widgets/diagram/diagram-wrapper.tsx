import { PropsWithChildren } from 'react';

import { useCommandHandler } from '@/shared/hooks/use-command-handler';
import { useCommandHandlerKeyboard } from '@/shared/hooks/use-command-handler-keyboard';

export function DiagramWrapper({ children }: PropsWithChildren) {
  const commandHandler = useCommandHandler();
  useCommandHandlerKeyboard(commandHandler);

  return <div className="absolute">{children}</div>;
}
