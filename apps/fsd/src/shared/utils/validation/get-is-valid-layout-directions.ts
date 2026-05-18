import { LayoutDirection, layoutDirections } from '@/shared/types/common';

export function getIsValidLayoutDirections(value?: unknown) {
  if (typeof value !== 'string') {
    return false;
  }

  return layoutDirections.includes(value as LayoutDirection);
}
