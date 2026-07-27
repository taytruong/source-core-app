import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

import { fetchOrder } from '../../actions';
import OrderManageContainer from './components';

export interface OrderManagePageProps {}

async function OrderManagePage({ searchParams }: QuerySearchParams) {
  const data = await fetchOrder({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search || '',
    status: searchParams.status,
    sort: searchParams.sort,
  });

  return (
    <OrderManageContainer
      orders={data?.orders}
      total={data?.total}
    />
  );
}

export default OrderManagePage;
