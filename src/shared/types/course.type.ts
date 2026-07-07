import { Types } from 'mongoose';

import { SortQueryParams } from './common';
import { CourseModelProps, LessonModelProps } from './models';

export interface CourseLessonDuration {
  duration: number;
  lessons: number;
}

export interface CourseQA {
  question: string;
  answer: string;
}

export interface CourseLessonPageRootProps {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
    sort: SortQueryParams;
  };
}

export type GetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export type CreateCourseParams = {
  title: string;
  slug: string;
  author: Types.ObjectId;
};

export type UpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: LessonModelProps[];
};

export type UpdateCourseParams = {
  slug: string;
  updateData: Partial<CourseModelProps>; // Partial : from must to option
  path?: string;
};
