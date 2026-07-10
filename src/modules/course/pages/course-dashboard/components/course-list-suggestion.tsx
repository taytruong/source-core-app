'use client';

import { CourseGrid, Heading } from '@/src/shared/components/common';
import { CourseStatus } from '@/src/shared/constants';

import { CourseItem } from '../../../components/course-item';
import { useQueryFetchCourses } from '../../../libs/react-query';

export interface CourseListSuggestionProps {}

function CourseListSuggestion(_props: CourseListSuggestionProps) {
  const { data, isLoading } = useQueryFetchCourses({
    limit: 4,
    status: CourseStatus.APPROVED,
  });
  const courseList = data || [];

  return (
    <div className="flex flex-col gap-5">
      <Heading className="lg:text-xl">For you</Heading>
      <CourseGrid isLoading={isLoading}>
        {courseList?.length > 0 &&
          courseList?.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
            />
          ))}
      </CourseGrid>
    </div>
  );
}

export default CourseListSuggestion;
