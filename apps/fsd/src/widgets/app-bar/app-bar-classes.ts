export const appBarClasses = {
  container:
    'pointer-events-auto flex h-auto w-full items-center justify-between rounded-[var(--wb-app-bar-border-radius)] border border-[var(--wb-app-bar-border-color)] bg-[var(--wb-app-bar-background)] px-4 py-3 max-[800px]:[&_.wb-app-bar-project-selection]:hidden',
  toolbar: 'flex min-w-min shrink-0 items-center gap-8',
  navSegment: 'flex min-w-0 shrink-0 items-center gap-2',
  projectSelection:
    'wb-app-bar-project-selection absolute left-1/2 flex -translate-x-1/2 items-center gap-2 max-[800px]:hidden',
  folderName: 'ax-public-p9 text-[var(--wb-app-bar-folder-name-color)]',
  title:
    'ax-public-p9 min-h-[1em] min-w-[1em] cursor-pointer text-[var(--wb-app-bar-diagram-title-color)] empty:border-b empty:border-dotted empty:border-current max-[800px]:ml-2',
  controls: 'flex min-w-min shrink-0 items-center justify-end gap-2',
  menuContainer: 'relative',
} as const;
