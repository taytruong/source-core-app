import { IComment } from "../database/comment.md";
import { ICoupon } from "../database/coupon.md";
import { ICourse } from "../database/course.md";
import { ILesson } from "../database/lesson.md";
import { ECouponType } from "./enum";
import { TUpdateCourseParams } from "./index.d";

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

//Omit ko lấy lectures từ ICourse
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

export type TCreateCouponParams = {
  title: string;
  code: string;
  type: ECouponType;
  value?: numner;
  start_date?: Date;
  end_date?: Date;
  active?: boolean;
  limit?: number;
  courses?: string[];
};

export type TUpdateCouponParams = {
  _id: string;
  updateData: Partial<TCreateCouponParams>;
};

export type TCouponParams = Omit<ICoupon, "courses"> & {
  courses: {
    _id: string;
    title: string;
  }[];
};

export type TCouponItem = Omit<ICoupon, "_id" | "courses">;

export interface StudyCourseProps extends Omit<ICourse, "lectures"> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}

export type TRatingIcon = "awesome" | "good" | "meh" | "bad" | "terrible";
export type TCreateRatingParams = {
  rate: number;
  content: string;
  user: string;
  course: string;
};

type TRatingItem = {
  _id: string;
  content: string;
  rate: number;
  create_at: string;
  course: {
    title: string;
    slug: string;
  };
  user: {
    name: string;
  };
  status: ERatingStatus;
};

export type TFilterData = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
};

export interface ICommentItem extends Omit<IComment, "user"> {
  user: {
    name: string;
    avatar: string;
  };
}
