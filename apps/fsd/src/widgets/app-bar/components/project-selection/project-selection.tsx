import { CaretDown } from '@phosphor-icons/react';
import { Input, Menu, NavButton } from '@synergycodes/overflow-ui';
import { useMemo, useState } from 'react';

import { Icon } from '@workflow-builder/icons';

import useStore from '@/store/store';

import { appBarClasses } from '../../app-bar-classes';

type ProjectSelectionProps = {
  onDuplicateClick?: () => void;
};

function ProjectSelectionComponent({ onDuplicateClick }: ProjectSelectionProps) {
  const documentName = useStore((state) => state.documentName || '');
  const isReadOnlyMode = useStore((store) => store.isReadOnlyMode);
  const setDocumentName = useStore((state) => state.setDocumentName);
  const [editName, setEditName] = useState<boolean>(false);

  const items = useMemo(
    () => [
      {
        label: 'Duplicate to Drafts',
        icon: <Icon name="Cards" />,
        onClick: onDuplicateClick,
      },
    ],
    [onDuplicateClick],
  );

  return (
    <div className={appBarClasses.projectSelection}>
      <span className={appBarClasses.folderName}>Folder Name /</span>
      {editName && !isReadOnlyMode ? (
        <Input
          value={documentName}
          onChange={(event) => {
            if (event.target.value.length > 128) return;
            setDocumentName(event.target.value);
          }}
          onBlur={() => setEditName(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }
          }}
          autoFocus={true}
        />
      ) : (
        <span className={appBarClasses.title} onClick={() => !isReadOnlyMode && setEditName(true)}>
          {documentName}
        </span>
      )}
      <div className={appBarClasses.menuContainer}>
        <Menu items={items}>
          <NavButton tooltip="Pick the project">
            <CaretDown />
          </NavButton>
        </Menu>
      </div>
    </div>
  );
}

export const ProjectSelection = ProjectSelectionComponent;
