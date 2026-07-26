import { FileTextIcon } from '@radix-ui/react-icons';

import { CourseItemDuration } from '@/src/modules/course/components/course-item';
import { CourseItemData } from '@/src/modules/course/types';
import { findAllLessons } from '@/src/modules/lesson/actions';
import { Heading } from '@/src/shared/components/common';
import { IconPlay } from '@/src/shared/components/icons';

import LessonSaveUrl from './lesson-save-url';
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

  const lessonInfo = [
    {
      title: lessonList?.length,
      icon: <IconPlay className="size-4" />,
      text: 'Lessons',
    },
    {
      title: foundCourse?.lectures.length,
      icon: <FileTextIcon className="size-4" />,
      text: 'Lectures',
    },
  ];

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
      <Heading className="mb-2 font-semibold">{foundCourse.title}</Heading>
      <div className="mb-5 flex items-center gap-3 text-sm">
        {lessonInfo.map((item, index) => (
          <div
            key={index}
            className="text-primary flex items-center gap-2"
          >
            {item.icon}
            <div className="flex items-center gap-1 text-black">
              <span>{item.title}</span>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
        <CourseItemDuration
          classIcon="text-primary"
          slug={foundCourse.slug}
        />
      </div>
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
