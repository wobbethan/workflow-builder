import { LabelElement as BaseLabelElement } from '@jsonforms/core';

import { LabelProps } from '@/ui/form/label/label';

import { Override } from './utils';

export type LabelElement = Override<BaseLabelElement, Omit<LabelProps, 'label'>>;

export type RichTextElement = Override<BaseLabelElement, Omit<LabelProps, 'label'> & { type: 'RichText' }>;
