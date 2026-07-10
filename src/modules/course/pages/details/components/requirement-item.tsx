import { IconArrowRightCycle } from '@/src/shared/components/icons';

export interface RequirementItemProps {
  title: string;
}

function RequirementItem({ title }: RequirementItemProps) {
  return (
    <div className="mb-3 flex items-center gap-2 rounded-lg bg-white p-5 shadow-md">
      <span className="text-logo flex size-5 shrink-0 items-center justify-center rounded">
        <IconArrowRightCycle />
      </span>
      <span>{title}</span>
    </div>
  );
}

export default RequirementItem;
