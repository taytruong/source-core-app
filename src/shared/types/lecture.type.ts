import { LessonItem } from './lesson.type';
import { LectureModelProps } from './models';

export interface LectureItem extends Omit<LectureModelProps, 'lessons'> {
  lessons: LessonItem[];
}
