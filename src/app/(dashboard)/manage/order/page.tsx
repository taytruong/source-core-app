import React from "react";
import OrderManage from "./OrderManage";
import { fetchOrder } from "@/src/lib/actions/order.action";
import { EOrderStatus } from "@/src/types/enum";
import { ITEM_PER_PAGE } from "@/src/constanst";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const data = await fetchOrder({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search || "",
    status: searchParams.status,
  });

  if (!data) return null;
  const { orders, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  return (
    <OrderManage
      orders={orders}
      totalPages={totalPages}
      total={total}
    ></OrderManage>
  );
};

export default page;
