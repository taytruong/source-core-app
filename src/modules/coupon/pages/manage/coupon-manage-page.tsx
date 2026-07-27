import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

import { getCoupons } from '../../actions';
import ManageCouponContainer from './components';

export interface CouponManagePageProps {}

async function CouponManagePage({ searchParams }: QuerySearchParams) {
  const data = await getCoupons({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    active: searchParams.active,
    sort: searchParams.sort,
  });

  if (!data) return null;
  const { coupons, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  return (
    <ManageCouponContainer
      coupons={coupons}
      total={total}
      totalPages={totalPages}
    />
  );
}

export default CouponManagePage;
