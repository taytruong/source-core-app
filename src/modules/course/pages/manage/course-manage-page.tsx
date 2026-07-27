import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

import { fetchCourse } from '../../actions';
import CourseManageContainer from './components';

export interface CourseManagePageProps {}

async function CourseManagePage({ searchParams }: QuerySearchParams) {
  const data = await fetchCourse({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
    sort: searchParams.sort,
  });

  return (
    <CourseManageContainer
      courses={data?.courses}
      total={data?.total}
    />
  );
}

export default CourseManagePage;
