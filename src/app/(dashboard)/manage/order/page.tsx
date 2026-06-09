import React from "react";
import OrderManage from "./OrderManage";
import { fetchOrder } from "@/src/lib/actions/order.action";

const page = async () => {
  const orders = await fetchOrder();
  return (
    <OrderManage
      orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
    ></OrderManage>
  );
};

export default page;
