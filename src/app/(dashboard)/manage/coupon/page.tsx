import React from "react";

import { getCoupons } from "@/src/lib/actions/coupon.action";
import { ITEM_PER_PAGE } from "@/src/shared/constants";

import CouponManage from "./CouponManage";

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
      total={total}
      totalPages={totalPages}
     />
  );
};

export default page;
