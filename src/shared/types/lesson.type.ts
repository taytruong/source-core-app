import { LessonModelProps } from './models';

export interface LessonItemData extends Omit<
  LessonModelProps,
  'course' | 'lecture'
> {
  course: string;
  lecture: string;
}

export interface CreateLessonParams {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug?: string;
}

export interface UpdateLessonParams {
  lessonId: string;
  path?: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
    _destroy?: boolean;
  };
}
