import { LucideIcon } from 'lucide-react';

interface CardItemProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isLoading?: boolean;
}

export default function CardItem({
  icon: Icon,
  iconBg,
  iconColor,
  isLoading,
  title,
  value,
}: CardItemProps) {
  if (isLoading) {
    return (
      <div className="bg-item flex items-center gap-6 rounded-lg px-4 py-5 shadow-sm">
        <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-200" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-12 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
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
