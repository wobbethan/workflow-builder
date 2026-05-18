import { PaletteItemOrGroup } from '@/shared/types/common';

import { action } from './nodes/action/action';
import { conditional } from './nodes/conditional/conditional';
import { decision } from './nodes/decision/decision';
import { delay } from './nodes/delay/delay';
import { notification } from './nodes/notification/notification';
import { triggerNode } from './nodes/trigger/trigger';

export function getPaletteData(): PaletteItemOrGroup[] {
  return [triggerNode, action, delay, conditional, decision, notification];
}
