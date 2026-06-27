import { getCouponByCode } from "@/src/lib/actions/coupon.action";
import { Heading } from "@/src/shared/components";

import UpdateCouponForm from "./UpdateCouponForm";

const page = async ({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) => {
  const couponDetails = await getCouponByCode({ code: searchParams.code });

  if (!couponDetails) return null;

  return (
    <div>
      <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={couponDetails} />
    </div>
  );
};

export default page;
