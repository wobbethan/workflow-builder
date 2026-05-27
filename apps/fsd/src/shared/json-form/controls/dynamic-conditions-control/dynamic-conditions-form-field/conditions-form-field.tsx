import { Input, NavButton, SegmentPicker, Select } from '@synergycodes/overflow-ui';
import clsx from 'clsx';
import { useMemo } from 'react';

import { Icon } from '@workflow-builder/icons';

import { DynamicCondition } from '@/shared/json-form/types/controls';
import {
  comparisonOperatorLabels,
  comparisonsOperators,
  validateCondition,
} from '@/shared/json-form/utils/conditional-transform';

type ConditionsFormFieldProps = {
  condition: Partial<DynamicCondition>;
  onRemove: () => void;
  onChange: (condition: DynamicCondition) => void;
  shouldShowOperator?: boolean;
  shouldShowValidation?: boolean;
};

export function ConditionsFormField(props: ConditionsFormFieldProps) {
  const { condition, onChange, onRemove, shouldShowOperator = false, shouldShowValidation } = props;

  function handleChange(field: 'x' | 'comparisonOperator' | 'y' | 'logicalOperator', value: unknown) {
    onChange({
      ...condition,
      [field]: value,
    } as DynamicCondition);
  }

  const errors = useMemo((): {
    x?: boolean;
    comparisonOperator?: boolean;
    y?: boolean;
  } => {
    if (!shouldShowValidation) {
      return {};
    }

    return validateCondition(condition);
  }, [condition, shouldShowValidation]);

  return (
    <>
      {shouldShowOperator && (
        <div className="flex justify-center items-center">
          <SegmentPicker
            className="w-[150px]"
            size="xx-small"
            value={condition.logicalOperator || 'AND'}
            onChange={(_, value) => handleChange('logicalOperator', value)}
          >
            <SegmentPicker.Item value="AND">all</SegmentPicker.Item>
            <SegmentPicker.Item value="OR">one</SegmentPicker.Item>
          </SegmentPicker>
        </div>
      )}
      <div
        className={clsx(
          'flex items-center gap-0.5 p-1 px-1.5 rounded-lg bg-[var(--wb-conditions-form-inputs-background)]',
          {
            'bg-[var(--wb-conditions-form-input-background-destructive)]': shouldShowValidation && (!condition.x || !condition.y),
          }
        )}
      >
        <NavButton onClick={() => {}} tooltip="Menu">
          <Icon name="DotsSixVertical" />
        </NavButton>
        <div className="flex flex-col gap-0.5 w-full">
          <Input
            className="bg-[var(--wb-conditions-form-input-background)]"
            onChange={(event) => handleChange('x', event.target.value)}
            value={condition.x}
            error={errors.x}
          />
          <Select
            className="bg-[var(--wb-conditions-form-input-background)]"
            value={condition.comparisonOperator}
            items={comparisonsOperators.map((operator) => ({
              label: comparisonOperatorLabels[operator],
              value: operator,
            }))}
            onChange={(_, value) => handleChange('comparisonOperator', value)}
            error={errors.comparisonOperator}
          />
          <Input
            className="bg-[var(--wb-conditions-form-input-background)]"
            onChange={(event) => handleChange('y', event.target.value)}
            value={condition.y}
            error={errors.y}
          />
        </div>
        <NavButton onClick={onRemove} tooltip="Menu">
          <Icon name="X" />
        </NavButton>
      </div>
    </>
  );
}
