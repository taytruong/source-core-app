import { fetchOrder } from '@/src/modules/order/actions';
import OrderManagePage from '@/src/modules/order/pages/order-manage-page';
import { OrderManagePageParams } from '@/src/modules/order/types/order.types';
import { ITEM_PER_PAGE } from '@/src/shared/constants';

const page = async ({ searchParams }: OrderManagePageParams) => {
  const data = await fetchOrder({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search || '',
    status: searchParams.status,
  });

  if (!data) return null;
  const { orders, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  return (
    <OrderManagePage
      orders={orders}
      total={total}
      totalPages={totalPages}
    />
  );
};

export default page;
