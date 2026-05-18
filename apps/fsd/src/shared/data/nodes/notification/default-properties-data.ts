import { NodeDataProperties } from '@/shared/json-form/types/default-properties';

import { NotificationNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<NotificationNodeSchema>> = {
  label: 'Notification',
  description: 'Send alerts or notifications',
  status: 'active',
  sendEmail: {
    priority: 'normal',
    retryOnFailure: false,
    retries: 3,
  },
};
