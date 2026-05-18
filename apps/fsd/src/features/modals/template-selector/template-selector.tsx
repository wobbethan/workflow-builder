import { useCallback } from 'react';

import { DiagramModel } from '@/shared/types/common';

import useStore from '@/store/store';

import { trackFutureChange } from '@/widgets/changes-tracker/stores/use-changes-tracker-store';

import { templates } from '@/data/templates';
import { useFitView } from '@/shared/hooks/use-fit-view';

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

  return (
    <div className="flex w-full flex-col gap-8">
      <section className="flex items-center">
        <span className="ax-public-p10 w-full text-center text-[var(--ax-colors-gray-500)]">
          Get started quickly with pre-designed templates
          <br />
          for your Workflow Editor
        </span>
      </section>
      <section className="flex flex-col items-center gap-4">
        <div className="flex max-w-[calc(140px*3+16px)] flex-wrap justify-center gap-1.5">
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
          <Tile icon="CornersOut" title="Empty Canvas" outlined={true} onClick={selectTemplate} />
        </div>
      </section>
    </div>
  );
}
