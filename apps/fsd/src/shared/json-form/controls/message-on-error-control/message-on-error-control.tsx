import { Message } from '@/ui/form/message/message';

import { MessageOnErrorProps } from '../../types/controls';
import { createControlRenderer } from '../../utils/rendering';
import { ControlWrapper } from '../control-wrapper';

function MessageOnErrorControl(props: MessageOnErrorProps) {
  const { errors, uischema } = props;
  const { text } = uischema;

  const hasErrors = errors.length > 0;

  if (hasErrors === false) {
    return null;
  }

  const message = text || (Array.isArray(errors) ? errors.join(', ') : errors);

  if (!message) {
    return null;
  }

  return (
    <ControlWrapper {...props}>
      <Message variant="error">{message}</Message>
    </ControlWrapper>
  );
}

export const messageOnErrorControlRenderer = createControlRenderer('MessageOnError', MessageOnErrorControl);
