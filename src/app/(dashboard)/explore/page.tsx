import { CourseExplorePage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';
import { QuerySearchParams } from '@/src/shared/types';

function ExplorePageRoot({ searchParams }: QuerySearchParams) {
  return (
    <>
      <Header title="Explore." />
      <CourseExplorePage searchParams={searchParams} />
    </>
  );
}

export default ExplorePageRoot;
