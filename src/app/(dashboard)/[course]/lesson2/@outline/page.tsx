import { fetchCourseBySlug } from '@/src/modules/course/actions';
import { getHistory } from '@/src/modules/history/actions/history.actions';
import { countLessonByCourseId } from '@/src/modules/lesson/actions';

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ course: courseId });
  const completePercent = Math.floor(
    ((histories?.length || 0) / (lessonCount || 1)) * 100,
  );

  return (
    <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="overflow-hidde relative mb-2 h-3 w-full rounded-full border border-slate-200 bg-white">
        <div
          className="from-primary h-full w-0 rounded-full bg-linear-to-r to-yellow-400 transition-all duration-500"
          style={{
            width: `${completePercent}%`,
          }}
        />
        <span
          className={`absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold ${
            completePercent > 50 ? 'text-white' : 'text-black'
          }`}
        >
          {completePercent}%
        </span>
      </div>
      {/* <LessonContentProps
        course={course}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        lectures={lectures}
        slug={slug}
      /> */}
    </div>
  );
};

export default page;
