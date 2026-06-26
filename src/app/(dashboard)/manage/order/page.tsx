import React from "react";
import { fetchOrder } from "@/src/lib/actions/order.action";
import { ITEM_PER_PAGE } from "@/src/shared/constants";
import OrderManagePage from "@/src/modules/order/pages/order-manage-page";
import { OrderManagePageParams } from "@/src/modules/order/types/order.types";

const page = async ({ searchParams }: OrderManagePageParams) => {
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
    <OrderManagePage
      orders={orders}
      totalPages={totalPages}
      total={total}
    ></OrderManagePage>
  );
};

export default page;
