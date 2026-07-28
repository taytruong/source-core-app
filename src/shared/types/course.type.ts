import { CourseStatus } from '../constants';
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
    id: string;
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
  author: string;
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

export interface DashboardOverview {
  cardItems: {
    totalCourses: number;
    totalCompleted: number;
    totalPending: number;
    totalHours: number;
  };
  chartData: {
    month: string;
    hours: number;
  }[];
}

export interface CourseStatsOverview {
  cardItems: {
    totalCourses: number;
    totalViews: number;
    totalRevenue: number;
    totalPending: number;
  };
  chartData: {
    status: CourseStatus;
    count: number;
  }[];
}
