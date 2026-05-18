import { PaletteItem } from '@/shared/types/common';

import { defaultPropertiesData } from './default-properties-data';
import { NotificationNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const notification: PaletteItem<NotificationNodeSchema> = {
  label: 'Notification',
  description: 'Send alerts or notifications',
  type: 'notification',
  icon: 'PaperPlaneRight',
  defaultPropertiesData,
  schema,
  uischema,
  outputSchema: {
    properties: {
      sent: { type: 'boolean', label: 'Sent', description: 'Whether the notification was sent successfully' },
      sentAt: { type: 'string', label: 'Sent At', description: 'ISO 8601 date-time when the notification was sent' },
      recipient: { type: 'string', label: 'Recipient', description: 'The email address the notification was sent to' },
    },
  },
};
