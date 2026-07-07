import { findAllLessons } from '@/src/modules/lesson/actions';
import { Heading } from '@/src/shared/components/common';

import LessonSaveUrl from './lesson-save-url';
import VideoPlayer from './video-player';

export interface CourseLessonPlayerProps {
  courseId: string;
  lessonSlug: string;
  courseSlug: string;
}

async function CourseLessonPlayer({
  courseId,
  courseSlug,
  lessonSlug,
}: CourseLessonPlayerProps) {
  const lessonList = await findAllLessons({ course: courseId || '' });

  const lessonDetails = lessonList?.find(
    (element) => element.slug == lessonSlug,
  );

  if (!lessonDetails) return null;

  const currentLessonIndex =
    lessonList?.findIndex((element) => element.slug === lessonSlug) || 0;

  const previousLesson = lessonList?.[currentLessonIndex - 1];
  const nextLesson = lessonList?.[currentLessonIndex + 1];

  const videoId = lessonDetails.video_url;

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={courseSlug}
        url={`/${courseSlug}/lesson?slug=${lessonSlug}`}
      />

      <VideoPlayer
        courseId={courseId}
        videoId={videoId}
        nextLesson={
          nextLesson ? `/${courseSlug}/lesson?slug=${nextLesson?.slug}` : ''
        }
        prevLesson={
          previousLesson
            ? `/${courseSlug}/lesson?slug=${previousLesson?.slug}`
            : ''
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
}

export default CourseLessonPlayer;
