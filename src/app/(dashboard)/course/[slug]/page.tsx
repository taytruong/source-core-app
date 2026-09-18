import Link from 'next/link';

import { CourseDetailsPage } from '@/src/modules/course/pages';
import { Heading } from '@/src/shared/components/common';
import { IconArrowLeft } from '@/src/shared/components/icons';
import { Header } from '@/src/shared/components/layout';

export interface CourseDetailPageRootProps {
  params: {
    slug: string;
  };
}
function CourseDetailPageRoot({ params }: CourseDetailPageRootProps) {
  return (
    <>
      <div className="mb-7 flex h-20 justify-between">
        <div className="flex items-center gap-3">
          <Link
            className="flex items-center rounded-md border border-gray-400 p-1"
            href={'/'}
          >
            <IconArrowLeft />
          </Link>
          <Heading className="font-semibold lg:text-3xl">
            Course Details.
          </Heading>
        </div>
        <Header />
      </div>
      <CourseDetailsPage slug={params.slug} />
    </>
  );
}

export default CourseDetailPageRoot;
