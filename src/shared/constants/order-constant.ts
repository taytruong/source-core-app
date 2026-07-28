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

export const orderStatusColors: Record<string, string> = {
  [OrderStatus.COMPLETE]: '#1dc259',
  [OrderStatus.PENDING]: '#cf8938',
  [OrderStatus.CANCEL]: '#DC2626',
};
