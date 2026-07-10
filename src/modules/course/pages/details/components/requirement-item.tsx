import { IconCheck } from '@/src/shared/components/icons';

export interface RequirementItemProps {
  title: string;
}

function RequirementItem({ title }: RequirementItemProps) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-logo flex size-7 shrink-0 items-center justify-center rounded">
        <IconCheck />
      </span>
      <span>{title}</span>
    </div>
  );
}

export default RequirementItem;
