'use client';
import { useEffect, useState } from 'react';

import { CourseGrid } from '@/src/shared/components/common';
import { lastLessonKey } from '@/src/shared/constants';

import { CourseItem } from '../../../components/course-item';
import { CourseItemData, LastLessonData } from '../../../types';

export interface StudyPageContainerProps {
  courses: CourseItemData[];
}

function StudyPageContainer({ courses }: StudyPageContainerProps) {
  const [lastLesson, setLastLesson] = useState<LastLessonData[]>([]);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const lesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
      : [];

    setLastLesson(lesson);
  }, []);

  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses.map((item) => {
        const firstLessonUrl = item.lectures[0].lessons[0].slug;
        const lastURL =
          lastLesson.find((element) => element.course === item.slug)?.lesson ||
          `/${item.slug}/lesson?slug=${firstLessonUrl}`;

        return (
          <CourseItem
            key={item.slug}
            cta="Tiếp tục học"
            data={item}
            url={lastURL}
          />
        );
      })}
    </CourseGrid>
  );
}

export default StudyPageContainer;
