'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { CourseGrid, Heading } from '@/src/shared/components/common';
import { CourseStatus } from '@/src/shared/constants';

import { CourseItem } from '../../../components/course-item';
import { useQueryFetchCourses } from '../../../libs/react-query';

export interface CourseListSuggestionProps {}

function CourseListSuggestion(_props: CourseListSuggestionProps) {
  const { data, isLoading } = useQueryFetchCourses({
    limit: 8,
    status: CourseStatus.APPROVED,
  });
  const courseList = data?.courses || [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Heading className="lg:text-xl">For you</Heading>
        <div className="text-primary flex items-center gap-1 text-base font-bold">
          <Link href="/explore">See All</Link>
          <ArrowRightIcon className="size-3" />
        </div>
      </div>
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
