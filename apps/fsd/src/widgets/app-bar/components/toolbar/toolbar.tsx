import { SaveButton } from '@/features/save-flow';

import { appBarClasses } from '../../app-bar-classes';

export function Toolbar() {
  return (
    <div className={appBarClasses.toolbar}>
      <div className={appBarClasses.navSegment}>
        <SaveButton />
      </div>
    </div>
  );
}
