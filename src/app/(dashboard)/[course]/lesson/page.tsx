import { CourseLessonPage } from '@/src/modules/course/pages';
import { CourseLessonPageRootProps } from '@/src/shared/types';

function CourseLessonPageRoot({
  params,
  searchParams,
}: CourseLessonPageRootProps) {
  return (
    <CourseLessonPage
      params={params}
      searchParams={searchParams}
    />
  );
}

export default CourseLessonPageRoot;
