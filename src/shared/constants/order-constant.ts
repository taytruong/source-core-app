import { BadgeStatusVariant } from '../types';
import { OrderStatus } from './enum';

export const orderStatus: {
  title: string;
  value: OrderStatus;
  variant: BadgeStatusVariant;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: OrderStatus.COMPLETE,
    className: 'text-green-500',
    variant: 'success',
  },
  {
    title: 'Chờ duyệt',
    value: OrderStatus.PENDING,
    className: 'text-orange-500',
    variant: 'warning',
  },
  {
    title: 'Đã hủy',
    value: OrderStatus.CANCEL,
    className: 'text-red-500',
    variant: 'danger',
  },
];
