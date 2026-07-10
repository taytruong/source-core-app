'use client';

import { CourseGrid } from '@/src/shared/components/common';
import { handleGetStorageLesson } from '@/src/shared/helper';

import { CourseItem } from '../../../components/course-item';
import { CourseItemData } from '../../../types';

export interface StudyPageContainerProps {
  courses: CourseItemData[];
}

function StudyPageContainer({ courses }: StudyPageContainerProps) {
  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses.map((item) => {
        const firstLessonUrl = item.lectures[0].lessons[0]._id.toString();
        const url = handleGetStorageLesson({
          courseSlug: item.slug,
          lessonId: firstLessonUrl,
        });

        return (
          <CourseItem
            key={item.slug}
            cta="Continue"
            data={item}
            url={url}
          />
        );
      })}
    </CourseGrid>
  );
}

export default StudyPageContainer;
