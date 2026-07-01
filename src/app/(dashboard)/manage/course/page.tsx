import { CourseManageContainer } from '@/src/modules/course/pages/course-manage';
import { CourseStatus } from '@/src/shared/constants';

export interface CourseManagePageRootProps {
  searchParams: {
    page: number;
    search: string;
    status: CourseStatus;
  };
}
const CourseManagePageRoot = async ({
  searchParams,
}: CourseManagePageRootProps) => {
  return <CourseManageContainer searchParams={searchParams} />;
};

export default CourseManagePageRoot;
