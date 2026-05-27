import { useContext, useEffect, useRef } from 'react';

import { SavingContext } from '../context/saving-context-wrapper';

export function useAutoSaveOnClose() {
  const onSaveRef = useRef<null | (() => void)>(null);

  const { onSave } = useContext(SavingContext);

  useEffect(() => {
    if (onSaveRef.current) {
      window.removeEventListener('beforeunload', onSaveRef.current);
    }

    onSaveRef.current = () => {
      onSave({ isAutoSave: true });
    };

    window.addEventListener('beforeunload', onSaveRef.current);

    return () => {
      if (onSaveRef.current) {
        window.removeEventListener('beforeunload', onSaveRef.current);
      }
    };
  }, [onSave]);
}
