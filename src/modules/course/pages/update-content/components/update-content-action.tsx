import { MouseEvent } from 'react';

import { cn } from '@/src/shared/utils';

export interface UpdateContentActionProps {
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
  children: React.ReactNode;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

function UpdateContentAction({
  children,
  onClick,
  variant = 'default',
}: UpdateContentActionProps) {
  const variantsClassName: Record<UpdateContentActionProps['variant'], string> =
    {
      default: '',
      success: 'text-green-500',
      warning: 'text-orange-500',
      danger: 'text-red-500',
      info: 'text-blue-500',
    };

  return (
    <div
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 p-2 hover:bg-slate-100',
        variantsClassName[variant],
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default UpdateContentAction;
