import { CouponType, RatingStatus } from '../shared/constants';
import {
  CommentModelProps,
  CourseModelProps,
  LessonModelProps,
} from '../shared/types';

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

export type CreateCourseParams = {
  title: string;
  slug: string;
  author: Types.ObjectId;
};

export type UpdateCourseParams = {
  slug: string;
  updateData: Partial<CourseModelProps>; // Partial : from must to option
  path?: string;
};

export type UpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: LessonModelProps[];
};

export type GetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

//Omit ko lấy lectures từ CourseModelProps
export interface TCourseUpdateParams extends Omit<
  CourseModelProps,
  'lectures'
> {
  lectures: UpdateCourseLecture[];
}

export type CreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};

export type UpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};

export type CreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: string;
  path?: string;
  slug?: string;
};

export type UpdateLessonParams = {
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

export type CreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path: string;
};

export type CreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};

export type CreateCouponParams = {
  title: string;
  code: string;
  type: CouponType;
  value?: numner;
  start_date?: Date;
  end_date?: Date;
  active?: boolean;
  limit?: number;
  courses?: string[];
};

export type UpdateCouponParams = {
  _id: string;
  updateData: Partial<CreateCouponParams>;
};

export type CouponParams = Omit<CouponModelProps, 'courses'> & {
  courses: {
    _id: string;
    title: string;
  }[];
};

export type CouponItem = Omit<CouponModelProps, '_id' | 'courses'>;

export interface StudyCourseProps extends Omit<CourseModelProps, 'lectures'> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}

export type TRatingIcon = 'awesome' | 'good' | 'meh' | 'bad' | 'terrible';
export type CreateRatingParams = {
  rate: number;
  content: string;
  user: string;
  course: string;
};

type RatingItem = {
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
  status: RatingStatus;
};

export type FilterData = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
};

export interface CommentItem extends Omit<CommentModelProps, 'user'> {
  user: {
    name: string;
    avatar: string;
  };
}
