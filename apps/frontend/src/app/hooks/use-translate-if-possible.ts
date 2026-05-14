import { useCallback } from 'react';

import { exists, t } from '@/features/i18n/t';

export function useTranslateIfPossible() {
  const translateIfPossible = useCallback((value = '') => {
    if (value && exists(value)) {
      return t(value);
    }

    return;
  }, []);

  return translateIfPossible;
}
