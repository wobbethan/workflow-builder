import { SlidersHorizontal, Trash } from '@phosphor-icons/react';
import { Input, NavButton } from '@synergycodes/overflow-ui';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';

import { FormControlWithLabel } from '@/ui/form/form-control-with-label/form-control-with-label';

import { DecisionBranch } from '@/shared/json-form/types/controls';
import { formatConditionCount } from '@/shared/json-form/utils/conditional-transform';
import { closeModal, openModal } from '@/features/modals/stores/use-modal-store';

import { ConditionModalFooter } from '../../dynamic-conditions-control/dynamic-condition-modal-footer/condition-modal-footer';
import {
  ConditionsForm,
  ConditionsFormHandle,
} from '../../dynamic-conditions-control/dynamic-conditions-form/conditions-form';

type Props = {
  branch: DecisionBranch;
  index: number;
  onUpdate: (id: string, branch: Partial<DecisionBranch>) => void;
  onRemove: (id: string) => void;
  enabled?: boolean;
};

export function BranchCard({ branch, index, onUpdate, onRemove, enabled = true }: Props) {
  const formRef = useRef<ConditionsFormHandle>(null);
  const { label, conditions, id } = branch;
  const conditionCount = conditions.length;

  const handleConfirm = useCallback(() => {
    formRef.current?.handleConfirm();
  }, []);

  const onClickEdit = useCallback(() => {
    openModal({
      content: (
        <ConditionsForm
          ref={formRef}
          onChange={(updatedConditions) => onUpdate(id, { conditions: updatedConditions })}
          value={conditions}
        />
      ),
      title: 'Conditional Editor',
      footer: <ConditionModalFooter closeModal={closeModal} handleConfirm={handleConfirm} />,
    });
  }, [conditions, handleConfirm, onUpdate, id]);

  const onLabelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate(id, { label: event.target.value });
    },
    [onUpdate, id],
  );

  const onClickRemove = useCallback(() => onRemove(branch.id), [onRemove, branch]);

  return (
    <div className="relative flex flex-col items-start p-[var(--wb-branch-card-padding)] gap-[var(--wb-branch-card-gap)] rounded-[var(--wb-branch-card-border-radius)] border-[var(--wb-branch-card-border-width)] border-solid border-[var(--wb-branch-card-border-color)]">
      <div className="w-full flex justify-between">
        <h1 className="ax-public-h10">Branch #{index + 1}</h1>
        <div className="flex gap-[var(--wb-branch-card-actions-gap)]">
          <NavButton onClick={onClickEdit}>
            <SlidersHorizontal weight="bold" />
          </NavButton>
          <NavButton onClick={onClickRemove}>
            <Trash weight="bold" />
          </NavButton>
        </div>
      </div>
      <div>
        <FormControlWithLabel label="Title">
          <Input
            value={label}
            placeholder={`Branch #${index + 1}`}
            onChange={onLabelChange}
            disabled={!enabled}
          />
        </FormControlWithLabel>
      </div>
      <button
        className={clsx(
          'ax-public-p11 flex p-[var(--wb-branch-card-chip-padding)] justify-center items-center gap-[var(--wb-branch-card-chip-gap)] rounded-[var(--wb-branch-card-chip-border-radius)] bg-[var(--wb-branch-card-chip-background)] border-none',
          {
            'text-[var(--wb-branch-card-chip-color)] bg-[var(--wb-branch-card-chip-background-no-conditions)]': conditionCount === 0,
          }
        )}
        onClick={onClickEdit}
      >
        {formatConditionCount(conditionCount)}
      </button>
    </div>
  );
}
