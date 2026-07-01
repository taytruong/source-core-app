import CourseUpdate from '@/src/components/course/course-update';
import { getCourseBySlug } from '@/src/lib/actions/course.action';
import { Heading } from '@/src/shared/components';

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const findCourse = await getCourseBySlug({
    slug: searchParams.slug,
  });

  if (!findCourse) return null;

  return (
    <>
      <Heading className="mb-8">
        Cập nhật khóa học
        <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
      </Heading>
    </>
  );
};

export default page;
