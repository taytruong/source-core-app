import { LucideIcon } from 'lucide-react';

interface CardItemProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function CardItem({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
}: CardItemProps) {
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
