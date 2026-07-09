import {
  IconComment,
  IconExplore,
  IconHome,
  IconOrder,
  IconPlay,
  IconStar,
  IconStudy,
  IconTicket,
  IconUsers,
} from '../components/icons';
import { MenuItemProps } from '../types';

export const menuItems: MenuItemProps[] = [
  {
    url: '/',
    title: 'Dashboard',
    title2: 'Tổng quan',
    icon: <IconHome className="size-5" />,
  },
  {
    url: '/explore',
    title: 'Khám phá',
    icon: <IconExplore className="size-5" />,
  },
  {
    url: '/study',
    title: 'Khu vực học tập',
    title2: 'Luyện tập',
    icon: <IconStudy className="size-5" />,
  },
  {
    url: '/manage/course',
    title: 'Quản lý khóa học',
    title2: 'Quản lý',
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
