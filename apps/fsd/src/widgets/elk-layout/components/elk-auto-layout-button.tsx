import { NavButton } from '@synergycodes/overflow-ui';
import { memo, useCallback, useState } from 'react';

import { Icon } from '@workflow-builder/icons';

import useStore from '@/store/store';

import { runElkAutoLayout } from '@/widgets/elk-layout/run-elk-layout';

import { showSnackbar } from '@/utils/show-snackbar';

export const ElkAutoLayoutButton = memo(function ElkAutoLayoutButton() {
  const isReadOnly = useStore((s) => s.isReadOnlyMode);
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const layoutDirection = useStore((s) => s.layoutDirection);
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = useCallback(async () => {
    if (isReadOnly || nodes.length === 0 || isRunning) {
      return;
    }
    setIsRunning(true);
    try {
      await runElkAutoLayout({ nodes, edges, layoutDirection });
    } catch {
      showSnackbar({ title: 'Auto layout could not be applied', variant: 'error' });
    } finally {
      setIsRunning(false);
    }
  }, [edges, isReadOnly, isRunning, layoutDirection, nodes]);

  return (
    <NavButton
      size="small"
      tooltip="Auto layout"
      disabled={isReadOnly || nodes.length === 0 || isRunning}
      onClick={handleClick}
    >
      <Icon name="TreeStructureDown" />
    </NavButton>
  );
});
