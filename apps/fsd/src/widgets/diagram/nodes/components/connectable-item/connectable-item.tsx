import { Handle, HandleType, Position } from '@xyflow/react';
import clsx from 'clsx';

import { ExclusiveUnion } from '@/utils/typescript';

import useStore from '@/store/store';

import { getHandleId } from '@/widgets/diagram/handles/get-handle-id';

type SharedProps = {
  label: string;
  canHaveBottomHandle?: boolean;
};

type PropsForHandleId = {
  handleId: string;
} & SharedProps;

type PropsForHandleConfig = {
  nodeId: string;
  innerId: string;
  handleType: HandleType;
} & SharedProps;

type Props = ExclusiveUnion<PropsForHandleId, PropsForHandleConfig>;

export function ConnectableItem(props: Props) {
  const { label, canHaveBottomHandle = true } = props;
  const layoutDirection = useStore(({ layoutDirection }) => layoutDirection);
  const isVertical = layoutDirection === 'DOWN' && canHaveBottomHandle;
  const position = isVertical ? Position.Bottom : Position.Right;

  const handleId =
    'handleId' in props
      ? props.handleId
      : getHandleId({
          nodeId: props.nodeId,
          innerId: props.innerId,
          handleType: props.handleType,
        });

  return (
    <div
      className={clsx(
        'ax-public-p11 relative flex max-w-[calc(var(--ax-public-node-width)-6*var(--ax-public-node-padding)+2*0.75rem+2*0.0625rem)] justify-between rounded-md border border-[var(--ax-input-stroke-primary-default)] bg-[var(--ax-ui-bg-tertiary-default)] px-3 py-2.5',
        layoutDirection === 'RIGHT' && 'gap-3',
      )}
    >
      <div className="truncate whitespace-nowrap">{label}</div>
      <div className={clsx('relative', isVertical && 'absolute bottom-0 left-1/2 -translate-x-1/2')}>
        <Handle id={handleId} position={position} type="source" />
      </div>
    </div>
  );
}
