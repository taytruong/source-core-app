import React from "react";
import CouponManage from "./CouponManage";
import { getCoupons } from "@/src/lib/actions/coupon.action";
import { ITEM_PER_PAGE } from "@/src/constanst";
const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    active: boolean;
  };
}) => {
  const data = await getCoupons({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search || "",
    active: searchParams.active,
  });
  if (!data) return null;
  const { coupons, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  return (
    <CouponManage
      coupons={coupons}
      totalPages={totalPages}
      total={total}
    ></CouponManage>
  );
};

export default page;
