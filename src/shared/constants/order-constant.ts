import { BadgeStatusVariant } from '../types';
import { OrderStatus } from './enum';

export const orderStatus: {
  title: string;
  value: OrderStatus;
  variant: BadgeStatusVariant;
  className?: string;
}[] = [
  {
    title: 'Completed',
    value: OrderStatus.COMPLETE,
    className: 'text-green-500',
    variant: 'success',
  },
  {
    title: 'Pending',
    value: OrderStatus.PENDING,
    className: 'text-orange-500',
    variant: 'warning',
  },
  {
    title: 'Cancelled',
    value: OrderStatus.CANCEL,
    className: 'text-red-500',
    variant: 'danger',
  },
];
