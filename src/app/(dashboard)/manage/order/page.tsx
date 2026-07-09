import { OrderManagePage } from '@/src/modules/order/pages';
import { Header } from '@/src/shared/components/layout';
import { QuerySearchParams } from '@/src/shared/types';

export interface OrderPageProps {}

function OrderPageRoots({ searchParams }: QuerySearchParams) {
  return (
    <>
      <Header title="Quản lý đơn hàng" />
      <OrderManagePage searchParams={searchParams} />;
    </>
  );
}

export default OrderPageRoots;
