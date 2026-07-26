import { Suspense } from 'react';

import { getHistory } from '@/src/modules/history/actions';
import { countLessonByCourseId } from '@/src/modules/lesson/actions';
import { CourseOutline, Loading } from '@/src/shared/components/common';
import { CourseLessonPageRootProps } from '@/src/shared/types';

import { fetchCourseBySlug } from '../../../actions';
import CourseLessonComment from './course-lesson-comment';
import CourseLessonOutline from './course-lesson-outline';
import CourseLessonPlayer from './course-lesson-player';
import LoadingPlayer from './course-lesson-player/loading-player';
import LessonWrapper from './lesson-wrapper';
import LoadingOutline from './loading-outline';

export interface CourseLessonContainerProps extends CourseLessonPageRootProps {}

async function CourseLessonContainer({
  params,
  searchParams,
}: CourseLessonContainerProps) {
  const courseSlug = params.course;
  const lessonId = searchParams.id;

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
            foundCourse={foundCourse}
            lessonId={lessonId}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CourseLessonComment
            lessonId={lessonId}
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
            lessonId={lessonId}
          />
        </CourseLessonOutline>
      </Suspense>
    </LessonWrapper>
  );
}

export default CourseLessonContainer;
