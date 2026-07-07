import React from 'react';

interface CourseGirdProps {
  children: React.ReactNode;
}

const CourseGrid = ({ children }: CourseGirdProps) => {
  return (
    <div className="3xl:grid-cols-6 course-slider mt-8 grid gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
      {children}
    </div>
  );
};

export default CourseGrid;
