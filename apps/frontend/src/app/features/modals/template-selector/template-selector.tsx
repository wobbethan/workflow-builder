import clsx from 'clsx';
import { useCallback } from 'react';

import { DiagramModel } from '@workflow-builder/types/common';

import styles from './template-selector.module.css';

import useStore from '@/store/store';

import { trackFutureChange } from '@/features/changes-tracker/stores/use-changes-tracker-store';
import { t } from '@/features/i18n/t';

import { templates } from '@/data/templates';
import { useFitView } from '@/hooks/use-fit-view';

import { closeModal } from '../stores/use-modal-store';
import { Tile } from './components/tile';

export function TemplateSelector() {
  const setDiagramModel = useStore((store) => store.setDiagramModel);
  const fitView = useFitView();

  const selectTemplate = useCallback(
    (model?: DiagramModel) => {
      setDiagramModel(model);
      fitView();
      closeModal();
    },
    [setDiagramModel, fitView],
  );

  const description = t('templateSelector.description');
  const [descriptionBefore, descriptionAfter = ''] = description.split('<br/>');

  return (
    <div className={styles['container']}>
      <section className={styles['header']}>
        <span className={clsx('ax-public-p10', styles['sub-title'])}>
          {descriptionBefore}
          <br />
          {descriptionAfter}
        </span>
      </section>
      <section className={styles['content']}>
        <div className={styles['templates']}>
          {templates.map(({ icon, id, name, value }) => (
            <Tile
              icon={icon}
              key={id}
              title={name}
              subTitle={`${value.diagram.nodes.length} nodes`}
              onClick={() => {
                trackFutureChange('selectTemplate', { templateName: name });
                selectTemplate(value);
              }}
            />
          ))}
          <Tile icon="CornersOut" title={t('templateSelector.emptyCanvas')} outlined={true} onClick={selectTemplate} />
        </div>
      </section>
    </div>
  );
}
