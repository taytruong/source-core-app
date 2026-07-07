import { Suspense } from 'react';

import { getHistory } from '@/src/modules/history/actions';
import { countLessonByCourseId } from '@/src/modules/lesson/actions';
import { CourseOutline, Loading } from '@/src/shared/components/common';

import { fetchCourseBySlug } from '../../../actions';
import { CourseLessonPageProps } from '../course-lesson-page';
import CourseLessonComment from './course-lesson-comment';
import CourseLessonOutline from './course-lesson-outline';
import CourseLessonPlayer from './course-lesson-player';
import LoadingPlayer from './course-lesson-player/loading-player';
import LessonWrapper from './lesson-wrapper';
import LoadingOutline from './loading-outline';

export interface CourseLessonContainerProps extends CourseLessonPageProps {}

async function CourseLessonContainer({
  params,
  searchParams,
}: CourseLessonContainerProps) {
  const courseSlug = params.course;
  const lessonSlug = searchParams.slug;
  const foundCourse = await fetchCourseBySlug({ slug: courseSlug });

  if (!foundCourse) return null;

  const courseId = foundCourse?._id.toString();
  const lectures = foundCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ course: courseId });
  const completePercent = Math.floor(
    ((histories?.length || 0) / (lessonCount || 1)) * 100,
  );

  return (
    <LessonWrapper courseId={courseId}>
      <div>
        <Suspense fallback={<LoadingPlayer />}>
          <CourseLessonPlayer
            courseId={courseId}
            courseSlug={courseSlug}
            lessonSlug={lessonSlug}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CourseLessonComment
            courseId={courseId}
            lessonSlug={lessonSlug}
            sort={searchParams.sort}
          />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingOutline />}>
        <CourseLessonOutline completePercent={completePercent}>
          <CourseOutline
            course={courseSlug}
            histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
            lectures={lectures}
            slug={lessonSlug}
          />
        </CourseLessonOutline>
      </Suspense>
    </LessonWrapper>
  );
}

export default CourseLessonContainer;
