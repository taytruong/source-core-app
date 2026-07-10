import { ManageCouponPage } from '@/src/modules/coupon/pages';
import { Header } from '@/src/shared/components/layout';
import { QuerySearchParams } from '@/src/shared/types';

export interface ManageCouponPageProps {}

function ManageCouponPageRoot({ searchParams }: QuerySearchParams) {
  return (
    <>
      <Header title="Manage Coupons." />
      <ManageCouponPage searchParams={searchParams} />
    </>
  );
}

export default ManageCouponPageRoot;
