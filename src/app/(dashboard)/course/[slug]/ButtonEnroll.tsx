"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/src/database/user.modal";
import { createOrder } from "@/src/lib/actions/order.action";
import { createOrderCode } from "@/src/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ButtonEnroll = ({
  user,
  courseId,
  amount,
}: {
  user: IUser | null | undefined;
  courseId: string;
  amount: number;
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
    });
    if (newOrder.code) {
      router.push(`/order/${newOrder.code}`);
    }
  };
  return (
    <Button variant="primary" className="w-full" onClick={handleEnrollCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
