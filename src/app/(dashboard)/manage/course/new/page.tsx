import { CreateCoursePage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';

export interface CreateCoursePageRootProps {}

function CreateCoursePageRoot(_props: CreateCoursePageRootProps) {
  return (
    <>
      <Header title="Create New Course." />
      <CreateCoursePage />
    </>
  );
}

export default CreateCoursePageRoot;
