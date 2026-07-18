'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createOrder } from '@/src/modules/order/actions';
import { Button } from '@/src/shared/components/ui/button';
import { useUserContext } from '@/src/shared/contexts';

interface ButtonEnroll {
  courseId: string;
  amount: number;
  coupon: string;
}
const ButtonEnroll = ({ amount, coupon, courseId }: ButtonEnroll) => {
  const { userInfo } = useUserContext();

  const router = useRouter();

  const createOrderCode = () => `DH-${Date.now().toString().slice(-6)}`;

  const handleEnrollCourse = async () => {
    if (!userInfo?.name) {
      toast.error('Please login to enroll in the course');

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

    if (newOrder.code) {
      router.push(`/order/${newOrder.code}`);
    }
  };

  return (
    <Button
      className="w-full"
      variant="primary"
      onClick={handleEnrollCourse}
    >
      Buy Now
    </Button>
  );
};

export default ButtonEnroll;
