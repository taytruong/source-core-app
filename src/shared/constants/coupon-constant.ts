import { CouponType } from './enum';

export const couponTypes: {
  title: string;
  value: CouponType;
}[] = [
  {
    title: 'Percent',
    value: CouponType.PERCENT,
  },
  {
    title: 'Value',
    value: CouponType.AMOUNT,
  },
];

export const couponStatus = [
  {
    title: 'Active',
    value: 1,
    className: 'text-green-500',
  },
  {
    title: 'Inactive',
    value: 0,
    className: 'text-orange-500',
  },
];

export const couponStatusColors = {
  Active: '#16A34A', // green - Active coupon
  Inactive: '#EA580C', // orange - Inactive coupon
} as const;
