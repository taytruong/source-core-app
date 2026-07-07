'use client';
import { useEffect } from 'react';

import { lastLessonKey } from '@/src/shared/constants';

interface LessonSaveUrl {
  url: string;
  course: string;
}
const LessonSaveUrl = ({ course, url }: LessonSaveUrl) => {
  useEffect(() => {
    let results: {
      course: string;
    }[] = JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || [];
    const item = {
      course,
      lesson: url,
    };

    results = results.filter((element) => element.course !== course);
    results.push(item);
    localStorage?.setItem(lastLessonKey, JSON.stringify(results));
  }, [url, course]);

  return null;
};

export default LessonSaveUrl;
