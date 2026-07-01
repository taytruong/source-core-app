import { CourseModelProps, RatingModelProps } from '@/src/shared/types';
import { LectureItem } from '@/src/shared/types/lecture.type';

export interface CourseProps extends Omit<
  CourseModelProps,
  'lectures' | 'rating'
> {
  lectures: LectureItem[];
  rating: RatingModelProps[];
}

export interface LastLessonData {
  course: string;
  lesson: string;
}
