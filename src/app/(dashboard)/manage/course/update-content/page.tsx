import { UpdateContentCoursePage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';

export interface UpdateContentCoursePageRootProps {
  searchParams: {
    slug: string;
  };
}

function UpdateContentCoursePageRoot({
  searchParams,
}: UpdateContentCoursePageRootProps) {
  return (
    <>
      <Header title="Update Course Content." />
      <UpdateContentCoursePage slug={searchParams.slug} />
    </>
  );
}

export default UpdateContentCoursePageRoot;
