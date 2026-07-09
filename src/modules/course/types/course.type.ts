import z from 'zod';

import { CourseModelProps, RatingModelProps } from '@/src/shared/types';
import { LectureItemData } from '@/src/shared/types/lecture.type';

import { CourseCommentFormSchema, CourseCreateSchema } from '../schemas';

export interface CourseItemData extends Omit<
  CourseModelProps,
  'lectures' | 'rating'
> {
  lectures: LectureItemData[];
  rating: RatingModelProps[];
}

export interface LastLessonData {
  course: string;
  lesson: string;
}

export type CourseCommentFormValues = z.infer<typeof CourseCommentFormSchema>;
export type CourseCreateFormValues = z.infer<typeof CourseCreateSchema>;
