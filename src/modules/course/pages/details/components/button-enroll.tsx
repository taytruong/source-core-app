'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  createOrder,
  getPendingOrderByUserAndCourse,
} from '@/src/modules/order/actions';
import { Button } from '@/src/shared/components/ui/button';
import { useUserContext } from '@/src/shared/contexts';

interface ButtonEnroll {
  courseId: string;
  amount: number;
  coupon: string;
}
const ButtonEnroll = ({ amount, coupon, courseId }: ButtonEnroll) => {
  const { userInfo } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createOrderCode = () => `DH-${Date.now().toString().slice(-6)}`;

  const handleEnrollCourse = async () => {
    if (!userInfo?.name) {
      toast.error('Please login to enroll in the course');

      return;
    }

    setIsLoading(true);

    try {
      const pendingOrder = await getPendingOrderByUserAndCourse({
        userId: userInfo._id.toString(),
        courseId,
      });

      if (pendingOrder) {
        toast.error(
          'You already have a pending order for this course. Please wait for admin approval, or check your existing order.',
        );

        return;
      }

      const newOrder = await createOrder({
        code: createOrderCode(),
        user: userInfo._id.toString(),
        course: courseId,
        total: amount,
        amount: amount,
        coupon,
      });

      if (newOrder?.code) {
        router.push(`/order/${newOrder.code}`);
      }
    } catch (error) {
      console.log('🚀 ~ handleEnrollCourse ~ error:', error);
      toast.error('Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      disabled={isLoading}
      variant="primary"
      onClick={handleEnrollCourse}
    >
      {isLoading ? 'Processing...' : 'Buy Now'}
    </Button>
  );
};

export default ButtonEnroll;
