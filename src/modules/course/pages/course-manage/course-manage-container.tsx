import { CourseManagePageRootProps } from '@/src/app/(dashboard)/manage/course/page';
import { getAllCourse } from '@/src/lib/actions/course.action';
import { ITEM_PER_PAGE } from '@/src/shared/constants';

import CourseManage from './components/course-manage';

export interface CourseManageContainerProps extends CourseManagePageRootProps {}

async function CourseManageContainer({
  searchParams,
}: CourseManageContainerProps) {
  const data = await getAllCourse({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search || '',
    status: searchParams.status,
  });

  if (!data) return null;
  const { courses, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  return (
    <CourseManage
      courses={courses}
      total={total}
      totalPages={totalPages}
    />
  );
}

export default CourseManageContainer;
