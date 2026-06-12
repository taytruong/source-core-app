import PageNotFound from "@/src/app/not-found";
import { getOrderDetails } from "@/src/lib/actions/order.action";
import React from "react";

const OrderDetails = async ({
  params,
}: {
  params: {
    code: string;
  };
}) => {
  const orderDetails = await getOrderDetails({
    code: params.code,
  });
  if (!orderDetails) return <PageNotFound />;
  return (
    <div className="flex flex-col gap-5">
      <p>
        Cám ơn bạn đã mua khóa học{" "}
        <strong className="text-primary">{orderDetails.course.title}</strong>{" "}
        với số tiền là{" "}
        <strong className="text-primary">{orderDetails.total}</strong>
      </p>
      <p>
        Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung{" "}
        <strong className="text-primary">{orderDetails.code}</strong>
      </p>
    </div>
  );
};

export default OrderDetails;
