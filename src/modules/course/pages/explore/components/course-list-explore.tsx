'use client';

import { CourseGrid } from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
import { useQueryString } from '@/src/shared/hooks';

import { CourseItem } from '../../../components/course-item';
import { CourseItemData } from '../../../types';

export interface CourseListSuggestionProps {
  courses: CourseItemData[] | undefined;
  isLoading: boolean;
}

function CourseListSuggestion({
  courses,
  isLoading,
}: CourseListSuggestionProps) {
  const courseList = courses || [];

  const { handleSearchData } = useQueryString();

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full lg:w-125">
        <Input
          placeholder="Search course ..."
          onChange={handleSearchData}
        />
      </div>
      {/* <Heading className="lg:text-xl">For you</Heading> */}
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
