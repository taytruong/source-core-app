'use client';

import { CourseStatus, ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

import { useQueryFetchCourses } from '../../libs/react-query';
import { CourseExploreContainer } from './components';

function CourseExplorePage({ searchParams }: QuerySearchParams) {
  const { data, isLoading } = useQueryFetchCourses({
    level: searchParams.level,
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    sort: searchParams.sort,
    status: CourseStatus.APPROVED,
  });

  return (
    <CourseExploreContainer
      courses={data?.courses}
      isLoading={isLoading}
      total={data?.total}
    />
  );
}

export default CourseExplorePage;
