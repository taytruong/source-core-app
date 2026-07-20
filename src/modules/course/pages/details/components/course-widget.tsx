'use client';
import Link from 'next/link';
import { useState } from 'react';

import {
  IconClock,
  IconPlay,
  IconStudy,
  IconUsers,
} from '@/src/shared/components/icons';
import { useUserContext } from '@/src/shared/contexts';

import { CourseItemData } from '../../../types';
import ButtonEnroll from './button-enroll';
import CouponForm from './coupon-form';

interface CourseWidgetProps {
  data: CourseItemData;
  duration: string;
}
const CourseWidget = ({ data, duration }: CourseWidgetProps) => {
  const [price, setPrice] = useState<number>(data.price);
  const [coupon, setCoupon] = useState('');
  const { userInfo } = useUserContext();

  const isAlreadyEnroll = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo?.courses)).includes(data._id)
    : false;

  if (isAlreadyEnroll)
    return (
      <Link
        className="bg-primary flexCenter h-15 w-full rounded-lg text-2xl font-semibold text-white shadow-sm"
        href="/study"
      >
        Study Area
      </Link>
    );

  return (
    <>
      <div className="sticky top-4 rounded-lg bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <strong className="text-primary text-3xl font-bold">
            $ {price.toLocaleString('en-EN')}
          </strong>
          <span className="text-lg text-slate-400 line-through">
            $ {data.sale_price.toLocaleString('en-EN')}
          </span>
          <span className="bg-primary/30 text-primary ml-auto inline-block rounded-lg px-3 py-1 text-sm font-medium shadow-sm">
            {Math.floor((price / data.sale_price) * 100)}%
          </span>
        </div>
        <h3 className="mb-3 text-sm font-medium">Course includes:</h3>
        <ul className="mb-5 flex flex-col gap-4 text-sm text-slate-500">
          <li className="flex items-center gap-3">
            <IconClock className="size-4" />
            <span>{duration} of learning</span>
          </li>
          <li className="flex items-center gap-3">
            <IconPlay className="size-4" />
            <span>Full HD Video</span>
          </li>
          <li className="flex items-center gap-3">
            <IconUsers className="size-4" />
            <span>Support available</span>
          </li>
          <li className="flex items-center gap-3">
            <IconStudy className="size-4" />
            <span>Additional resources</span>
          </li>
        </ul>
        <ButtonEnroll
          amount={price}
          coupon={coupon}
          courseId={data._id.toString()}
        />

        <CouponForm
          courseId={data._id.toString()}
          originalPrice={data.price}
          setCouponId={setCoupon}
          setPrice={setPrice}
        />
      </div>
    </>
  );
};

export default CourseWidget;
