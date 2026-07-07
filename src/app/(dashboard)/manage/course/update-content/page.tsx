import { UpdateContentCoursePage } from '@/src/modules/course/pages';

export interface UpdateContentCoursePageRootProps {
  searchParams: {
    slug: string;
  };
}

function UpdateContentCoursePageRoot({
  searchParams,
}: UpdateContentCoursePageRootProps) {
  return <UpdateContentCoursePage slug={searchParams.slug} />;
}

export default UpdateContentCoursePageRoot;
