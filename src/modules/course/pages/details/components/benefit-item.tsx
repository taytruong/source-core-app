import { IconCheck } from '@/src/shared/components/icons';

export interface BenefitItemProps {
  title: string;
}

function BenefitItem({ title }: BenefitItemProps) {
  return (
    <div className="mb-3 flex items-center gap-2 rounded-lg bg-white p-5 shadow-md">
      <span className="text-primary flex size-5 shrink-0 items-center justify-center rounded">
        <IconCheck />
      </span>
      <span>{title}</span>
    </div>
  );
}

export default BenefitItem;
