import { ManageCouponPage } from '@/src/modules/coupon/pages';
import { QuerySearchParams } from '@/src/shared/types';

export interface ManageCouponPageProps {}

function ManageCouponPageRoot({ searchParams }: QuerySearchParams) {
  return <ManageCouponPage searchParams={searchParams} />;
}

export default ManageCouponPageRoot;
