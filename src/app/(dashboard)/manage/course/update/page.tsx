import { UpdateCoursePage } from '@/src/modules/course/pages';
import { Heading } from '@/src/shared/components/common';

export interface UpdateCoursePageRootProps {
  searchParams: {
    slug: string;
  };
}

function UpdateCoursePageRoot({ searchParams }: UpdateCoursePageRootProps) {
  return (
    <>
      <Heading>Cập nhật khóa học</Heading>
      <UpdateCoursePage slug={searchParams.slug} />
    </>
  );
}

export default UpdateCoursePageRoot;
