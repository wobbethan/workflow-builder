import { Button } from '@synergycodes/overflow-ui';
import { Edge, Node } from '@xyflow/react';

type DeleteConfirmationProps = {
  nodes: Node[];
  edges: Edge[];
};

export function DeleteConfirmation({ nodes, edges }: DeleteConfirmationProps) {
  const parts = [
    nodes.length > 0 ? (nodes.length > 1 ? 'nodes' : 'node') : '',
    edges.length > 0 ? (edges.length > 1 ? 'edges' : 'edge') : '',
  ].filter(Boolean);

  const translatedParts = parts.join(' and connected ');
  const selectedText = nodes.length > 1 ? 'selected' : 'selected';

  return (
    <div className="ax-public-p9 flex select-none flex-col gap-4 text-[var(--ax-txt-secondary-default)] [&_b]:font-bold">
      <span>
        You&apos;re about to <b>permanently delete</b> {selectedText} {translatedParts}. Please, confirm to proceed.
      </span>
    </div>
  );
}

type DeleteConfirmationButtonsProps = {
  onDeleteClick: () => void;
  onCancelClick: () => void;
};

export function DeleteConfirmationButtons({ onDeleteClick, onCancelClick }: DeleteConfirmationButtonsProps) {
  return (
    <div className="flex w-full justify-between">
      <Button variant="secondary" onClick={onCancelClick}>
        Cancel
      </Button>
      <Button onClick={onDeleteClick} size="medium" variant="error" autoFocus>
        Delete
      </Button>
    </div>
  );
}
