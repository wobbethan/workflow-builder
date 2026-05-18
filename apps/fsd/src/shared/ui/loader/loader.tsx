import { clsx } from 'clsx';
import { CSSProperties, memo } from 'react';

type LoaderType = {
  isLoading?: boolean;
  isSemiTransparent?: boolean;
};

interface CSSCustomProperties extends CSSProperties {
  '--wb-loader-background-opacity': number;
}

const semiTransparentOpacityVariable: CSSCustomProperties = {
  '--wb-loader-background-opacity': 0.8,
};

export const Loader = memo(({ isLoading, isSemiTransparent }: LoaderType) => {
  const setLoaderBackgroundOpacityVariable = isSemiTransparent ? semiTransparentOpacityVariable : {};

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={clsx(
        'absolute z-[100] flex h-full w-full items-center justify-center bg-[var(--ax-ui-bg-primary-default)] text-xl',
        isSemiTransparent && 'opacity-80',
      )}
      style={setLoaderBackgroundOpacityVariable}
    >
      <div>Loading...</div>
    </div>
  );
});
