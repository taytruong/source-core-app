import { CourseItemData } from '@/src/modules/course/types';
import { findAllLessons } from '@/src/modules/lesson/actions';

import LessonDescDetail from './lesson-desc-detail';
import LessonSaveUrl from './lesson-save-url';
import LessonTitleDetail from './lesson-title-detail';
import VideoPlayer from './video-player';

export interface CourseLessonPlayerProps {
  courseId: string;
  lessonId: string;
  courseSlug: string;
  foundCourse: CourseItemData;
}

async function CourseLessonPlayer({
  courseId,
  courseSlug,
  foundCourse,
  lessonId,
}: CourseLessonPlayerProps) {
  const lessonList = await findAllLessons({ course: courseId || '' });

  const lessonDetails = lessonList?.find(
    (element) => element._id.toString() == lessonId,
  );

  if (!lessonDetails) return null;

  // const currentLessonIndex =
  //   lessonList?.findIndex((element) => element._id.toString() === lessonId) ||
  //   0;

  // const previousLesson = lessonList?.[currentLessonIndex - 1];
  // const nextLesson = lessonList?.[currentLessonIndex + 1];

  // const nextLessonUrl = nextLesson
  //   ? `/${courseSlug}/lesson?id=${nextLesson._id.toString()}`
  //   : '';
  // const previousLessonUrl = previousLesson
  //   ? `/${courseSlug}/lesson?id=${previousLesson._id.toString()}`
  //   : '';

  const videoId = lessonDetails.video_url;

  return (
    <div className="mb-5">
      <LessonTitleDetail
        foundCourse={foundCourse}
        lessonList={lessonList}
      />
      <LessonSaveUrl
        course={courseSlug}
        url={`/${courseSlug}/lesson?id=${lessonId}`}
      />

      <VideoPlayer
        courseId={courseId}
        // nextLesson={nextLessonUrl}
        // prevLesson={previousLessonUrl}
        videoId={videoId}
      />

      <LessonDescDetail lessonDetails={lessonDetails} />
    </div>
  );
}

export default CourseLessonPlayer;
