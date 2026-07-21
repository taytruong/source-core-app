import {
  IconExplore,
  IconHome,
  IconOrder,
  IconPlay,
  IconStar,
  IconStudy,
  IconTicket,
} from '../components/icons';
import { MenuItemProps } from '../types';

export const menuItems: MenuItemProps[] = [
  {
    url: '/',
    title: 'Dashboard',
    title2: 'Overview',
    icon: <IconHome className="size-5" />,
  },
  {
    url: '/explore',
    title: 'Explore',
    icon: <IconExplore className="size-5" />,
  },
  {
    url: '/study',
    title: 'Study Area',
    title2: 'Learning',
    icon: <IconStudy className="size-5" />,
  },
  {
    url: '/manage/course',
    title: 'Course ',
    title2: 'Management',
    icon: <IconPlay className="size-5" />,
  },
  {
    url: '/manage/order',
    title: 'Order ',
    icon: <IconOrder className="size-5" />,
  },
  {
    url: '/manage/coupon',
    title: 'Coupon ',
    icon: <IconTicket className="size-5" />,
  },
  {
    url: '/manage/rating',
    title: 'Rating ',
    icon: <IconStar className="size-5" />,
  },
  // {
  //   url: '/manage/member',
  //   title: 'Member ',
  //   icon: <IconUsers className="size-5" />,
  // },
  // {
  //   url: '/manage/comment',
  //   title: 'Comment ',
  //   icon: <IconComment className="size-5" />,
  // },
];
