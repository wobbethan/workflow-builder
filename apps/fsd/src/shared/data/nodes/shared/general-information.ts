import type { UISchema, UISchemaElement } from '@/shared/json-form/types/uischema';

export const statusOptions = {
  active: { label: 'Active', value: 'active', icon: 'StatusActive' },
  draft: { label: 'Draft', value: 'draft', icon: 'StatusDraft' },
  disabled: { label: 'Disabled', value: 'disabled', icon: 'StatusDisabled' },
} as const;

export const globalControls: UISchemaElement[] = [
  /*
    If you set the node data customErrors, an exclamation mark will be shown on the node,
    and an error message will be displayed in the sidebar.

    data.properties.customErrors = [
      {
        instancePath: '/missingPreviousVariable',
        message: 'Your custom message',
        schemaPath: '',
        keyword: '',
        params: {},
      },
    ];
  */
  {
    type: 'MessageOnError',
    scope: '#/properties/missingPreviousVariable',
    text: 'Missing dependency for this field.',
  },
];

export const generalInformation: UISchema = {
  type: 'Accordion',
  label: 'General Information',
  rule: {
    effect: 'SHOW',
    condition: {
      scope: '#',
      schema: {
        required: ['type'],
      },
    },
  },
  elements: [
    {
      type: 'Text',
      scope: '#/properties/label',
      label: 'Title',
      placeholder: 'Node Title...',
    },
    {
      type: 'Text',
      scope: '#/properties/description',
      label: 'Description',
      placeholder: 'Type your description here...',
    },
  ],
};
