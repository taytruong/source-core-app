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
      <Header title="Update Course." />
      <UpdateCoursePage slug={searchParams.slug} />
    </>
  );
}

export default UpdateCoursePageRoot;
