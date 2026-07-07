import * as React from 'react';

import { cn } from '../../utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'focus:border-primary focus-primary h-10 w-full min-w-0 rounded border border-slate-400 bg-white px-3 py-1 text-sm font-medium transition-all outline-none disabled:cursor-not-allowed disabled:bg-gray-100',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
