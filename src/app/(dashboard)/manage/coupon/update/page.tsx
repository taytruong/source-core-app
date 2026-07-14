import { UpdateCouponPage } from '@/src/modules/coupon/pages';
import { Header } from '@/src/shared/components/layout';

export interface UpdateCouponPageRootProps {
  searchParams: {
    code: string;
  };
}

function UpdateCouponPageRoot({ searchParams }: UpdateCouponPageRootProps) {
  return (
    <>
      <Header title="Update Coupon Code." />
      <UpdateCouponPage code={searchParams.code} />
    </>
  );
}

export default UpdateCouponPageRoot;
