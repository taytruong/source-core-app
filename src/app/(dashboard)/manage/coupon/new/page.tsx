import { CreateCouponPage } from '@/src/modules/coupon/pages';
import { Header } from '@/src/shared/components/layout';

export interface CreateCouponPageProps {}

function CreateCouponPageRoot(_props: CreateCouponPageProps) {
  return (
    <>
      <Header title="Tạo mới mã giảm giá" />
      <CreateCouponPage />
    </>
  );
}

export default CreateCouponPageRoot;
