import './variables.css';

import { noop } from '@/utils/noop';

import { appBarClasses } from './app-bar-classes';
import { Controls } from './components/controls/controls';
import { ProjectSelection } from './components/project-selection/project-selection';
import { Toolbar } from './components/toolbar/toolbar';

export function AppBarContainer() {
  return (
    <div className={appBarClasses.container}>
      <Toolbar />
      <ProjectSelection onDuplicateClick={noop} />
      <Controls />
    </div>
  );
}
