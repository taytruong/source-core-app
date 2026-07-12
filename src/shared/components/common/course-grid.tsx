import React from 'react';

import { CourseItemSkeleton } from '@/src/modules/course/components/course-item';

interface CourseGirdProps {
  children: React.ReactNode;
  isLoading?: boolean;
  type?: 'continue';
}

const CourseGrid = ({ children, isLoading, type }: CourseGirdProps) => {
  if (isLoading) {
    return (
      <>
        {type === 'continue' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(490px,1fr))] gap-4">
            {Array.from({ length: 2 })
              .fill(0)
              .map((_, index) => (
                <CourseItemSkeleton
                  key={index}
                  type="continue"
                />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {Array.from({ length: 3 })
              .fill(0)
              .map((_, index) => (
                <CourseItemSkeleton key={index} />
              ))}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {type === 'continue' ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(490px,1fr))] gap-4">
          {children}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {children}
        </div>
      )}
    </>
  );
};

export default CourseGrid;
