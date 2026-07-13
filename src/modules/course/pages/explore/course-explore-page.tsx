'use client';

import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

import { useQueryFetchCourses } from '../../libs/react-query';
import { CourseExploreContainer } from './components';

function CourseExplorePage({ searchParams }: QuerySearchParams) {
  const { data, isLoading } = useQueryFetchCourses({
    status: searchParams.status,
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
  });

  return (
    <CourseExploreContainer
      courses={data}
      isLoading={isLoading}
    />
  );
}

export default CourseExplorePage;
