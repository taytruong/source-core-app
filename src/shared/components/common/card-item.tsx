import { LucideIcon } from 'lucide-react';

interface CardItemProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isLoading?: boolean;
  subText?: string;
}

export default function CardItem({
  icon: Icon,
  iconBg,
  iconColor,
  isLoading,
  subText,
  title,
  value,
}: CardItemProps) {
  if (isLoading) {
    return (
      <div className="bg-item flex flex-col gap-4 rounded-lg px-7 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="size-5 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="bg-item flex flex-col gap-5 rounded-lg px-7 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div
          className="flex size-6 items-center justify-center rounded"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon size={14} />
        </div>
        <span className="text-muted-foreground text-sm font-medium">
          {title}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-5xl font-semibold">{value}</h3>
        {!!subText && <span className="text-muted-foreground text-xs">{subText}</span>}
      </div>
    </div>
  );
}
