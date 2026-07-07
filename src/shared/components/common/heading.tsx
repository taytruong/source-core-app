import React from 'react';

import { cn } from '../../utils';

const Heading = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn('text-2xl font-bold lg:text-3xl', className)}>
      {children}
    </h1>
  );
};

export default Heading;
