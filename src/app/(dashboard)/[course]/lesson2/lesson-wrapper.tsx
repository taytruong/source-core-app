'use client';
import React from 'react';

import useGlobalStore from '@/src/store';

const LessonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { shouldExpandedPlayer } = useGlobalStore();

  return (
    <div
      className="grid min-h-screen items-start gap-10 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      style={{
        display: shouldExpandedPlayer ? 'block' : 'grid',
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
