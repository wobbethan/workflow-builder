import { NavButton } from '@synergycodes/overflow-ui';
import { Icon, type WBIcon } from '@workflow-builder/icons';
import { memo } from 'react';

import { alertPluginNotImplemented } from '../utils/alert-plugin-not-implemented';

type Props = {
  pluginDisplayName: string;
  icon: WBIcon;
  tooltip: string;
};

export const PluginShellNavButton = memo(function PluginShellNavButton({
  pluginDisplayName,
  icon,
  tooltip,
}: Props) {
  return (
    <NavButton tooltip={tooltip} onClick={() => alertPluginNotImplemented(pluginDisplayName)}>
      <Icon name={icon} />
    </NavButton>
  );
});
