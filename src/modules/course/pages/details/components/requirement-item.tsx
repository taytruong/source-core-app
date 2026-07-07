import { IconChecked } from '@/src/shared/components/icons';

export interface RequirementItemProps {
  title: string;
}

function RequirementItem({ title }: RequirementItemProps) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded text-green-500">
        <IconChecked />
      </span>
      <span>{title}</span>
    </div>
  );
}

export default RequirementItem;
