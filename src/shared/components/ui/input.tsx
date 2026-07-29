import * as React from 'react';

import { cn } from '../../utils';

function Input({
  className,
  icon,
  type,
  ...props
}: React.ComponentProps<'input'> & { icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {!!icon && <div className="flex items-center gap-2">{icon}:</div>}
      <input
        data-slot="input"
        type={type}
        className={cn(
          'focus:border-primary focus-primary h-10 w-full min-w-0 rounded-lg bg-white px-3 py-1 text-sm font-medium shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:bg-gray-100',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
