import { CouponType } from './enum';

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

export const couponStatus = [
  {
    title: 'Đang kích hoạt',
    value: 1,
    className: 'text-green-500',
  },
  {
    title: 'Chưa kích hoạt',
    value: 0,
    className: 'text-orange-500',
  },
];
