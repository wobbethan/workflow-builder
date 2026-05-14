import styles from '../../app-bar.module.css';

import { OptionalAppBarTools } from '@/features/plugins-core/components/app/optional-app-bar-toolbar';

import { SaveButton } from '@/features/integration/components/save-button/save-button';

export function Toolbar() {
  return (
    <div className={styles['toolbar']}>
      <div className={styles['nav-segment']}>
        <OptionalAppBarTools>
          <SaveButton />
        </OptionalAppBarTools>
      </div>
    </div>
  );
}
