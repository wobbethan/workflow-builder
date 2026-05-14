import { NavButton } from '@synergycodes/overflow-ui';
import { memo, useCallback, useMemo, useState } from 'react';

import type { LayoutDirection } from '@workflow-builder/types/common';

import { Icon } from '@workflow-builder/icons';

import useStore from '@/store/store';

import { setStoreLayoutDirection } from '@/store/slices/diagram-slice/actions';

import { runElkAutoLayout } from '@/features/elk-layout/run-elk-layout';

import { t } from '@/features/i18n/t';

import { showSnackbar } from '@/utils/show-snackbar';

export const ChangeLayoutDirectionButton = memo(function ChangeLayoutDirectionButton() {
  const isReadOnly = useStore((s) => s.isReadOnlyMode);
  const nodes = useStore((s) => s.nodes);
  const layoutDirection = useStore((s) => s.layoutDirection);
  const [isRunning, setIsRunning] = useState(false);

  const tooltip =
    layoutDirection === 'RIGHT'
      ? t('tooltips.changeLayoutDirectionToDown')
      : t('tooltips.changeLayoutDirectionToRight');

  const nextDirection = useMemo((): LayoutDirection => (layoutDirection === 'RIGHT' ? 'DOWN' : 'RIGHT'), [
    layoutDirection,
  ]);

  const handleClick = useCallback(async () => {
    if (isReadOnly || nodes.length === 0 || isRunning) {
      return;
    }
    setIsRunning(true);
    try {
      setStoreLayoutDirection(nextDirection);
      const { nodes: nextNodes, edges: nextEdges } = useStore.getState();
      await runElkAutoLayout({
        nodes: nextNodes,
        edges: nextEdges,
        layoutDirection: nextDirection,
      });
    } catch {
      showSnackbar({ title: 'autoLayoutError', variant: 'error' });
    } finally {
      setIsRunning(false);
    }
  }, [isReadOnly, isRunning, nextDirection, nodes.length]);

  return (
    <NavButton
      size="small"
      tooltip={tooltip}
      disabled={isReadOnly || nodes.length === 0 || isRunning}
      onClick={handleClick}
    >
      <Icon name="ArrowsOutCardinal" />
    </NavButton>
  );
});
