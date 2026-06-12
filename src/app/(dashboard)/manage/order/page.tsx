import React from "react";
import OrderManage from "./OrderManage";
import { fetchOrder } from "@/src/lib/actions/order.action";
import { EOrderStatus } from "@/src/types/enum";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const orders = await fetchOrder({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search || "",
    status: searchParams.status,
  });
  return (
    <OrderManage
      orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
    ></OrderManage>
  );
};

export default page;
