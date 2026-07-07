import { CourseManagePage } from '@/src/modules/course/pages';
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
  return <CourseManagePage searchParams={searchParams} />;
};

export default CourseManagePageRoot;
