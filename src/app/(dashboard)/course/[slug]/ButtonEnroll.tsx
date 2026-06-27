"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { IUser } from "@/src/database/user.md";
import { createOrder } from "@/src/lib/actions/order.action";
import { Button } from "@/src/shared/components/ui/button";
import { createOrderCode } from "@/src/utils";

const ButtonEnroll = ({
  amount,
  coupon,
  courseId,
  user,
}: {
  user: IUser | null | undefined;
  courseId: string;
  amount: number;
  coupon: string;
}) => {
  const router = useRouter();
  const handleEnrollCourse = async () => {
    if (!user?.name) {
      toast.error("Vui lòng đăng nhập");

      return;
    }

    const newOrder = await createOrder({
      code: createOrderCode(),
      user: user._id.toString(),
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
    <Button className="w-full" variant="primary" onClick={handleEnrollCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
