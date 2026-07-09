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
    <h1 className={cn('text-xl font-bold lg:text-2xl', className)}>
      {children}
    </h1>
  );
};

export default Heading;
