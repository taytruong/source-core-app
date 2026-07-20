import { findAllLessons } from '@/src/modules/lesson/actions';
import { Heading } from '@/src/shared/components/common';

import LessonSaveUrl from './lesson-save-url';
import VideoPlayer from './video-player';

export interface CourseLessonPlayerProps {
  courseId: string;
  lessonId: string;
  courseSlug: string;
}

async function CourseLessonPlayer({
  courseId,
  courseSlug,
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

      <Heading className="mb-5 font-semibold">{lessonDetails.title}</Heading>
      {
        <div className="entry-content bg-item rounded-lg p-5 shadow-sm">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }}
          />
        </div>
      }
    </div>
  );
}

export default CourseLessonPlayer;
