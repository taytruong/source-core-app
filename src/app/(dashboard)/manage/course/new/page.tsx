import { CreateCoursePage } from '@/src/modules/course/pages';
import { Heading } from '@/src/shared/components/common';

export interface CreateCoursePageRootProps {}

function CreateCoursePageRoot(_props: CreateCoursePageRootProps) {
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CreateCoursePage />
    </>
  );
}

export default CreateCoursePageRoot;
