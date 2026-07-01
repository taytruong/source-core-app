import { LessonModelProps } from './models';

export interface LessonItem extends Omit<
  LessonModelProps,
  'course' | 'lecture'
> {
  course: string;
}
