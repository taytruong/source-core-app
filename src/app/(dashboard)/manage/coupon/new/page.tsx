import { CreateCouponPage } from '@/src/modules/coupon/pages';
import { Heading } from '@/src/shared/components/common';

export interface CreateCouponPageProps {}

function CreateCouponPageRoot(_props: CreateCouponPageProps) {
  return (
    <>
      <Heading>Tạo mới mã giảm giá</Heading>
      <CreateCouponPage />
    </>
  );
}

export default CreateCouponPageRoot;
