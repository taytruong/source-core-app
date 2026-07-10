import { CreateCouponPage } from '@/src/modules/coupon/pages';
import { Header } from '@/src/shared/components/layout';

export interface CreateCouponPageProps {}

function CreateCouponPageRoot(_props: CreateCouponPageProps) {
  return (
    <>
      <Header title="Create New Coupon." />
      <CreateCouponPage />
    </>
  );
}

export default CreateCouponPageRoot;
