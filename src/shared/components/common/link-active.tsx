'use client'; // vì có usePathname của next -> chỉ nên dùng cho server  component
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '../../utils';

interface LinkActiveProps {
  url: string;
  children?: React.ReactNode;
}

const LinkActive = ({ children, url }: LinkActiveProps) => {
  const pathName = usePathname();
  const isActive = url === pathName;

  return (
    <Link
      href={url}
      className={cn(
        'flex items-center gap-4 rounded-xl px-5 py-4 text-base text-black transition-all',
        {
          'svg-animate bg-black/70 font-bold text-white shadow-sm': isActive,
          'border-transparent font-medium hover:scale-[1.02] hover:bg-[#ebd0a5]/20 hover:transition-all':
            !isActive,
        },
      )}
    >
      {children}
    </Link>
  );
};

export default LinkActive;
