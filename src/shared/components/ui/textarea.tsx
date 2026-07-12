import * as React from 'react';

import { cn } from '../../utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'focus:border-primary focus-primary flex field-sizing-content min-h-20 w-full resize-none rounded-lg bg-white px-2.5 py-2 text-sm font-medium shadow-sm transition-colors outline-none',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
