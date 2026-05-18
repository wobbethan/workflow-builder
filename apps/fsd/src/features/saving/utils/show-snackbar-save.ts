import { SnackbarType } from '@synergycodes/overflow-ui';

import { showSnackbar } from '@/utils/show-snackbar';

import type { OnSaveParams } from '../types';

export function showSnackbarSaveSuccessIfNeeded(savingParams?: OnSaveParams) {
  if (savingParams?.isAutoSave) {
    return;
  }

  showSnackbar({
    title: 'Saving diagram successfully',
    variant: SnackbarType.SUCCESS,
  });
}

export function showSnackbarSaveErrorIfNeeded(savingParams?: OnSaveParams) {
  if (savingParams?.isAutoSave) {
    return;
  }

  showSnackbar({
    title: 'An error occurred while saving diagram',
    variant: SnackbarType.ERROR,
  });
}
