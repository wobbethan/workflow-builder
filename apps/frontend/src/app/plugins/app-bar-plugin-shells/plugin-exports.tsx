import { createElement } from 'react';

import { MenuItemProps } from '@synergycodes/overflow-ui';

import { Icon } from '@workflow-builder/icons';

import { registerComponentDecorator } from '@/features/plugins-core/adapters/adapter-components';
import { registerFunctionDecorator } from '@/features/plugins-core/adapters/adapter-functions';
import { PluginShellNavButton } from '@/features/plugins-core/components/plugin-shell-nav-button';
import { alertPluginNotImplemented } from '@/features/plugins-core/utils/alert-plugin-not-implemented';

import { ChangeLayoutDirectionButton } from '@/features/elk-layout/components/change-layout-direction-button';
import { ElkAutoLayoutButton } from '@/features/elk-layout/components/elk-auto-layout-button';

import styles from './app-bar-plugin-shells.module.css';

/**
 * Single flex row so toolbar icons are not treated as separate flex items of the outer bar
 * (which can shrink or wrap unpredictably next to the save control).
 */
function ToolbarPluginShellCluster() {
  return (
    <div className={styles.cluster}>
      <PluginShellNavButton pluginDisplayName="Undo / redo" icon="ArrowUUpLeft" tooltip="Undo (shell)" />
      <PluginShellNavButton pluginDisplayName="Undo / redo" icon="ArrowUUpRight" tooltip="Redo (shell)" />
      <PluginShellNavButton pluginDisplayName="Copy / paste" icon="Copy" tooltip="Copy (shell)" />
      <PluginShellNavButton pluginDisplayName="Copy / paste" icon="ClipboardText" tooltip="Paste (shell)" />
    </div>
  );
}

registerComponentDecorator('OptionalAppBarTools', {
  content: ToolbarPluginShellCluster,
  place: 'after',
  priority: 100,
  name: 'AppBarToolbarPluginShellCluster',
});

function AppBarControlsPluginShellCluster() {
  return (
    <div className={styles.cluster}>
      <ElkAutoLayoutButton />
      <ChangeLayoutDirectionButton />
    </div>
  );
}

registerComponentDecorator('OptionalAppBarControls', {
  content: AppBarControlsPluginShellCluster,
  place: 'after',
  priority: 70,
  name: 'AppBarControlsPluginShellCluster',
});

registerFunctionDecorator('getControlsDotsItems', {
  place: 'after',
  priority: 40,
  name: 'AppBarOverflowMenuPluginShells',
  callback: function appendOverflowMenuShells({ returnValue }) {
    const items = returnValue as MenuItemProps[];
    if (!Array.isArray(items)) {
      return;
    }
    return {
      replacedReturn: [
        ...items,
        { type: 'separator' },
        {
          label: 'Validate diagram',
          icon: createElement(Icon, { name: 'SealCheck' }),
          onClick: () => alertPluginNotImplemented('Validation'),
        },
      ],
    };
  },
});
