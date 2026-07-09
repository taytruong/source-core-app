import { UpdateCoursePage } from '@/src/modules/course/pages';
import Header from '@/src/shared/components/layout/header';

export interface UpdateCoursePageRootProps {
  searchParams: {
    slug: string;
  };
}

function UpdateCoursePageRoot({ searchParams }: UpdateCoursePageRootProps) {
  return (
    <>
      <Header title="Cập nhật khóa học" />
      <UpdateCoursePage slug={searchParams.slug} />
    </>
  );
}

export default UpdateCoursePageRoot;
