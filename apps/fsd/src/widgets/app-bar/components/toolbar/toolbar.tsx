import { SaveButton } from '@/features/saving';

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
