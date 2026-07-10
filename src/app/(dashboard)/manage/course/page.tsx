import { CourseManagePage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';
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
  return (
    <>
      <Header title="Manage Courses." />
      <CourseManagePage searchParams={searchParams} />
    </>
  );
};

export default CourseManagePageRoot;
