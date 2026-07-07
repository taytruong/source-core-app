import { BadgeStatusVariant } from '../../types';
import { cn } from '../../utils';

interface BadgeStatusProps {
  title?: string;
  onClick?: () => void;
  variant?: BadgeStatusVariant;
  className?: string;
}

const BadgeStatus = ({
  className = '',
  onClick,
  title,
  variant = 'default',
}: BadgeStatusProps) => {
  const variantsClassNames: Record<BadgeStatusVariant, string> = {
    default: '',
    success: 'text-green-500',
    warning: 'text-orange-500',
    danger: 'text-red-500',
  };

  return (
    <span
      className={cn(
        'bg-opacity-10 rounded-md border border-current px-3 py-1 text-xs font-medium whitespace-nowrap',
        variantsClassNames[variant],
        className,
      )}
      onClick={onClick}
    >
      {title}
    </span>
  );
};

export default BadgeStatus;
