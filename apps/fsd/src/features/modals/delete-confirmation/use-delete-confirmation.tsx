import { MinusCircle } from '@phosphor-icons/react';
import { Edge, Node } from '@xyflow/react';
import { useCallback } from 'react';

import { closeModal, openModal } from '../stores/use-modal-store';
import { DeleteConfirmation, DeleteConfirmationButtons } from './delete-confirmation';

type Props = {
  nodes: Node[];
  edges: Edge[];
  onDeleteClick: () => void;
  onModalClosed: () => void;
};

export function useDeleteConfirmation() {
  const handleDeleteClick = useCallback((onDeleteClick: () => void) => {
    onDeleteClick();
    closeModal();
  }, []);

  const openDeleteConfirmationModal = useCallback(
    ({ nodes, edges, onDeleteClick, onModalClosed }: Props) => {
      openModal({
        content: <DeleteConfirmation nodes={nodes} edges={edges} />,
        footer: (
          <DeleteConfirmationButtons
            onCancelClick={closeModal}
            onDeleteClick={() => handleDeleteClick(onDeleteClick)}
          />
        ),
        icon: <MinusCircle />,
        title: 'Delete Selection?',
        onModalClosed: onModalClosed,
      });
    },
    [handleDeleteClick],
  );

  return { openDeleteConfirmationModal };
}
