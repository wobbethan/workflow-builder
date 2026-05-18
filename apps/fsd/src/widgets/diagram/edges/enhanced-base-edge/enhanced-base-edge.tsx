import { BaseEdge, BaseEdgeProps } from '@xyflow/react';

type EnhancedBaseEdgeProps = BaseEdgeProps;

export function EnhancedBaseEdge({ id, path, ...rest }: EnhancedBaseEdgeProps) {
  return (
    <>
      <BaseEdge
        data-path-border-for={id}
        className="!stroke-transparent ![stroke-width:2]"
        path={path}
      />
      <BaseEdge id={id} data-edge-id={id} path={path} {...rest} />
    </>
  );
}
