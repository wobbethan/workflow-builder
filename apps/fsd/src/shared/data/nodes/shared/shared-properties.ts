import { BaseNodePropertiesSchema } from '@/shared/types/node-schema';

export const sharedProperties: BaseNodePropertiesSchema = {
  label: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
};
