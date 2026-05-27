import { ChangeLayoutDirectionButton } from '@/widgets/elk-layout/components/change-layout-direction-button';
import { ElkAutoLayoutButton } from '@/widgets/elk-layout/components/elk-auto-layout-button';

export function LayoutControlsCluster() {
  return (
    <div className="inline-flex shrink-0 flex-row items-center gap-2">
      <ElkAutoLayoutButton />
      <ChangeLayoutDirectionButton />
    </div>
  );
}
