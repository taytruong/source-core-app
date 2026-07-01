import { CourseDetailsPage } from '@/src/modules/course/pages';

export interface CourseDetailPageRootProps {
  params: {
    slug: string;
  };
}
function CourseDetailPageRoot({ params }: CourseDetailPageRootProps) {
  return <CourseDetailsPage slug={params.slug} />;
}

export default CourseDetailPageRoot;
