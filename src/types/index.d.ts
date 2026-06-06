import { TUpdateCourseParams } from "./index.d";
import { ICourse } from "../database/course.md";
import { ILesson } from "../database/lesson.md";

export type LinkActiveProps = {
  url: string;
  children?: React.ReactNode;
};

export type MenuItemProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
};

export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: Types.ObjectId;
};

export type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>; // Partial : from must to option
  path?: string;
};

export type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: ILesson[];
};

export type TGetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> {
  lectures: TUpdateCourseLecture[];
}

export type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};

export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};

export type TCreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: string;
  path?: string;
  slug?: string;
};

export type TUpdateLessonParams = {
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
};

export type TCreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path: string;
};

export type TCreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};
