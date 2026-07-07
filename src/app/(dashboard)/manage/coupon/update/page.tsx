import { UpdateCouponPage } from '@/src/modules/coupon/pages';
import { Heading } from '@/src/shared/components/common';

export interface UpdateCouponPageRootProps {
  searchParams: {
    code: string;
  };
}

function UpdateCouponPageRoot({ searchParams }: UpdateCouponPageRootProps) {
  return (
    <>
      <Heading>Cập nhật mã giảm giá</Heading>
      <UpdateCouponPage code={searchParams.code} />
    </>
  );
}

export default UpdateCouponPageRoot;
