import { Loader } from '@/ui/loader/loader';

import { useSavingStore } from '@/features/saving/stores/use-saving-store';

export function AppLoaderContainer() {
  const isLoading = useSavingStore((store) => store.savingStatus === 'disabled');

  return <Loader isLoading={isLoading} isSemiTransparent={true} />;
}
