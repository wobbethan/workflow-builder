import { NavButton, TextArea } from '@synergycodes/overflow-ui';
import { useCallback, useMemo, useRef } from 'react';

import { Icon } from '@workflow-builder/icons';

import { closeModal, openModal } from '@/features/modals/stores/use-modal-store';

import { DynamicCondition, DynamicConditionsControlProps } from '../../types/controls';
import { conditionsToDependencies, formatConditionCount } from '../../utils/conditional-transform';
import { createControlRenderer } from '../../utils/rendering';
import { ControlWrapper } from '../control-wrapper';
import { ConditionModalFooter } from './dynamic-condition-modal-footer/condition-modal-footer';
import { ConditionsForm, ConditionsFormHandle } from './dynamic-conditions-form/conditions-form';

function DynamicConditionsControl(props: DynamicConditionsControlProps) {
  const { data = [], handleChange, path, enabled } = props;
  const formRef = useRef<ConditionsFormHandle>(null);

  const dependencies = useMemo(() => {
    return conditionsToDependencies(data);
  }, [data]);

  const onChange = useCallback(
    (value: DynamicCondition[]) => {
      handleChange(path, value);
    },
    [handleChange, path],
  );

  const handleConfirm = useCallback(() => {
    formRef.current?.handleConfirm();
  }, []);

  const openEditorModal = useCallback(() => {
    openModal({
      content: <ConditionsForm ref={formRef} onChange={onChange} value={data} />,
      title: 'Conditional Editor',
      footer: <ConditionModalFooter closeModal={closeModal} handleConfirm={handleConfirm} />,
    });
  }, [data, onChange, handleConfirm]);

  return (
    <div className="p-2 border border-solid border-[var(--wb-conditions-form-border-color)] rounded-[var(--wb-conditions-form-border-radius)]">
      <div className="flex justify-between items-center gap-1.5 mb-3 font-semibold text-[var(--wb-conditions-form-header-color)]">
        <span className="ax-public-h10 leading-none">Conditional Editor</span>
        <NavButton size="small" onClick={openEditorModal} tooltip="Conditional Editor">
          <Icon name="FrameCorners" size="small" />
        </NavButton>
      </div>
      <ControlWrapper {...props} uischema={{ ...props.uischema, label: 'Dependencies' }}>
        <TextArea disabled={!enabled} value={dependencies.join(' ')} onClick={openEditorModal} size="medium" />
        <span className="ax-public-p10 py-1 px-2 rounded bg-[var(--wb-conditions-form-tag-bg-color)] mr-auto">{formatConditionCount(data.length)}</span>
      </ControlWrapper>
    </div>
  );
}

export const dynamicConditionsControlRenderer = createControlRenderer('DynamicConditions', DynamicConditionsControl);
