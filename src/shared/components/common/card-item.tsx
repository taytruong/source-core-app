import { LucideIcon } from 'lucide-react';

interface CardItemProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isLoading?: boolean;
  subText?: string;
  type?: 'dashboard' | 'stats';
}

export default function CardItem({
  icon: Icon,
  iconBg,
  iconColor,
  isLoading,
  subText,
  title,
  type = 'stats',
  value,
}: CardItemProps) {
  if (type === 'dashboard') {
    if (isLoading) {
      <div className="bg-item flex items-center gap-6 rounded-lg px-4 py-5 shadow-sm">
        <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-200" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-12 animate-pulse rounded bg-gray-200" />
        </div>
      </div>;
    }

    return (
      <div className="bg-item flex items-center gap-6 rounded-lg px-4 py-5 shadow-sm">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: iconBg,
            color: iconColor,
          }}
        >
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    <div className="bg-item flex flex-col gap-4 rounded-lg px-7 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="size-5 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
    </div>;
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
        {!!subText && (
          <span className="text-muted-foreground text-xs">{subText}</span>
        )}
      </div>
    </div>
  );
}
