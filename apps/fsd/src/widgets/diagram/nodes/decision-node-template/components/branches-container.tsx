import clsx from 'clsx';

import { LayoutDirection } from '@/shared/types/common';

import { DecisionBranch } from '@/shared/json-form/types/controls';

import { ConnectableItem } from '../../components/connectable-item/connectable-item';
import { NodeSection } from '../../components/node-section/node-section';
import { PlaceholderButton } from '../../components/placeholder-button/placeholder-button';

type Props = {
  decisionBranches: DecisionBranch[];
  layoutDirection?: LayoutDirection;
  onAddBranch?: () => void;
};

export function BranchesContainer({ decisionBranches, layoutDirection, onAddBranch }: Props) {
  // Branches should be displayed vertically when layout direction is horizontal (sic!)
  const isListVertical = layoutDirection === 'RIGHT';

  return (
    <NodeSection label="Branches">
      <div className={clsx('flex justify-center gap-1', isListVertical && 'flex-col')}>
        {decisionBranches.map(({ id, sourceHandle, label }, index) => (
          <ConnectableItem
            key={id}
            label={label || `Branch #${index + 1}`}
            handleId={sourceHandle}
          />
        ))}
        <PlaceholderButton label="Add branch" onClick={onAddBranch} />
      </div>
    </NodeSection>
  );
}
