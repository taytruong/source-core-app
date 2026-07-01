import z from 'zod';

import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStar,
  IconStudy,
  IconTicket,
  IconUsers,
} from '@/src/shared/components/icons';
import { MenuItemProps, TRatingIcon } from '@/src/types';

import {
  CouponType,
  CourseLevel,
  CourseStatus,
  OrderStatus,
  RatingStatus,
} from './enum';

export const menuItems: MenuItemProps[] = [
  {
    url: '/',
    title: 'Khám phá',
    icon: <IconExplore className="size-5" />,
  },
  {
    url: '/study',
    title: 'Khu vực học tập',
    icon: <IconStudy className="size-5" />,
  },
  {
    url: '/manage/course',
    title: 'Quản lý khóa học',
    icon: <IconPlay className="size-5" />,
  },
  {
    url: '/manage/member',
    title: 'Quản lý thành viên',
    icon: <IconUsers className="size-5" />,
  },
  {
    url: '/manage/order',
    title: 'Quản lý đơn hàng',
    icon: <IconOrder className="size-5" />,
  },
  {
    url: '/manage/coupon',
    title: 'Quản lý mã giảm giá',
    icon: <IconTicket className="size-5" />,
  },
  {
    url: '/manage/rating',
    title: 'Quản lý đánh giá',
    icon: <IconStar className="size-5" />,
  },
  {
    url: '/manage/comment',
    title: 'Quản lý bình luận',
    icon: <IconComment className="size-5" />,
  },
];

export const courseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: CourseStatus.APPROVED,
    className: 'text-green-500',
  },
  {
    title: 'Chờ duyệt',
    value: CourseStatus.PENDING,
    className: 'text-orange-500',
  },
  {
    title: 'Từ chối',
    value: CourseStatus.REJECTED,
    className: 'text-red-500',
  },
];

export const courseLevel: {
  title: string;
  value: CourseLevel;
}[] = [
  {
    title: 'Dễ',
    value: CourseLevel.BEGINNER,
  },
  {
    title: 'Trung bình',
    value: CourseLevel.INTERMEDIATE,
  },
  {
    title: 'Khó',
    value: CourseLevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<CourseLevel, string> = {
  [CourseLevel.ADVANCED]: 'Khó',
  [CourseLevel.INTERMEDIATE]: 'Trung bình',
  [CourseLevel.BEGINNER]: 'Dễ',
};

export const commonClassNames = {
  status:
    'bg-current/10 border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-normal',
  iconSetting:
    'size-9 p-2 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-100 shrink-0',
  iconPagination:
    'size-8 rounded-md border border-slate-200 hover:border-primary hover:text-primary flex items-center justify-center bg-white p-1.5 transition-all',
  primaryButton:
    'flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary h-12 button-primary',
};

export const editorOptions = (field: any, theme: any) => ({
  initialValue: '',
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
    height: 300,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'codesample',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'heading',
    ],
    toolbar:
      'undo redo | ' +
      'codesample | bold italic forecolor | alignleft aligncenter |' +
      'alignright alignjustify | bullist numlist |' +
      'image |' +
      'h1 h2 h3 h4 h5 h6 | preview | fullscreen |' +
      'link',
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});

export const lastLessonKey = 'lastLesson'; //(localStorage)

export const orderStatus: {
  title: string;
  value: OrderStatus;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: OrderStatus.COMPLETE,
    className: 'text-green-500',
  },
  {
    title: 'Chờ duyệt',
    value: OrderStatus.PENDING,
    className: 'text-orange-500',
  },
  {
    title: 'Đã hủy',
    value: OrderStatus.CANCEL,
    className: 'text-red-500',
  },
];

export const couponTypes: {
  title: string;
  value: CouponType;
}[] = [
  {
    title: 'Phần trăm',
    value: CouponType.PERCENT,
  },
  {
    title: 'Giá trị',
    value: CouponType.AMOUNT,
  },
];

export const couponFormSchema = z.object({
  title: z
    .string({ message: 'Tiêu đề không được để trống' })
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  code: z
    .string({ message: 'Mã giảm giá không được để trống' })
    .min(3, 'Mã giảm giá phải có ít nhất 3 ký tự')
    .max(10, 'Mã giảm giá không được quá 10 ký tự'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.enum([CouponType.PERCENT, CouponType.AMOUNT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});

export const ratingList: {
  title: TRatingIcon;
  value: number;
}[] = [
  {
    title: 'awesome',
    value: 5,
  },
  {
    title: 'good',
    value: 4,
  },
  {
    title: 'meh',
    value: 3,
  },
  {
    title: 'bad',
    value: 2,
  },
  {
    title: 'terrible',
    value: 1,
  },
];

export const ratingStatus: {
  title: string;
  value: RatingStatus;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: RatingStatus.ACTIVE,
    className: 'text-green-500',
  },
  {
    title: 'Chờ duyệt',
    value: RatingStatus.UNACTIVE,
    className: 'text-orange-500',
  },
];

export const allValue = 'ALL';
export const ITEM_PER_PAGE = 10;
export const couponStatus = [
  {
    title: 'Đang kích hoạt',
    value: 1,
  },
  {
    title: 'Chưa kích hoạt',
    value: 0,
  },
];

export const MAX_COMMENT_LEVEL = 3;
