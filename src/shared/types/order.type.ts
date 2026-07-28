import { CourseItemData } from '@/src/modules/course/types';

import { OrderStatus } from '../constants';
import { CouponItemData } from './coupon.type';
import { OrderModelProps } from './models';
import { UserItemData } from './user.type';

export interface OrderItemData extends Omit<
  OrderModelProps,
  'course' | 'user' | 'coupon'
> {
  course: CourseItemData;
  user: UserItemData;
  coupon: CouponItemData;
}
export type CreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};

export interface UpdateOrderParams {
  orderId: string;
  status: OrderStatus;
}

export interface OrderStatsOverview {
  cardItems: {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
    totalPending: number;
  };
  chartData: {
    status: OrderStatus;
    count: number;
  }[];
}
