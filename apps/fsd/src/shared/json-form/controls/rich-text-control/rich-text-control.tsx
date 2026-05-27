import { JsonFormsRendererRegistryEntry, LabelProps } from '@jsonforms/core';
import { withJsonFormsLabelProps } from '@jsonforms/react';

import { LabelElement } from '../../types/labels';
import { createTester } from '../../utils/rendering';

function RichTextRendererComponent({ uischema }: LabelProps) {
  const { text } = uischema as LabelElement;

  return (
    <span
      className="ax-public-p11 text-[var(--ax-public-form-rich-text-color)] [&_a]:text-inherit"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export const richTextRenderer: JsonFormsRendererRegistryEntry = {
  renderer: withJsonFormsLabelProps(RichTextRendererComponent),
  tester: createTester('RichText'),
};
