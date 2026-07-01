import { auth } from '@clerk/nextjs/server';

import { fetchCourseBySlug } from '@/src/modules/course/actions';
import { findAllLessons } from '@/src/modules/lesson/actions';
import { getUserInfo } from '@/src/modules/user/actions';
import { Heading } from '@/src/shared/components';

import LessonSaveUrl from '../lesson-save-url';
import VideoPlayer from './video-player';

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
  const { userId } = await auth();
  const findUser = await getUserInfo({ userId: userId! });
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse) return null;

  const courseId = findCourse?._id.toString();
  const lessonList = await findAllLessons({ course: courseId || '' });

  const lessonDetails = lessonList?.find((element) => element.slug == slug);

  if (!lessonDetails) return null;

  const currentLessonIndex =
    lessonList?.findIndex((element) => element.slug === slug) || 0;

  const previousLesson = lessonList?.[currentLessonIndex - 1];
  const nextLesson = lessonList?.[currentLessonIndex + 1];

  const videoId = lessonDetails.video_url;

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
      />
      <VideoPlayer
        videoId={videoId}
        data={{
          userId: findUser?._id.toString() || '',
          courseId,
        }}
        nextLesson={
          nextLesson ? `/${course}/lesson?slug=${nextLesson?.slug}` : ''
        }
        prevLesson={
          previousLesson ? `/${course}/lesson?slug=${previousLesson?.slug}` : ''
        }
      />

      <Heading className="mb-5 font-semibold">{lessonDetails.title}</Heading>
      <div className="entry-content rounded-lg border border-slate-100 bg-white p-5">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }}
        />
      </div>
    </div>
  );
};

export default page;
