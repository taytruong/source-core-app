import { CourseDetailsPage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';

export interface CourseDetailPageRootProps {
  params: {
    slug: string;
  };
}
function CourseDetailPageRoot({ params }: CourseDetailPageRootProps) {
  return (
    <>
      <Header title="Course Details." />
      <CourseDetailsPage slug={params.slug} />
    </>
  );
}

export default CourseDetailPageRoot;
