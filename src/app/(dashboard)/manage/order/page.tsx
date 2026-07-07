import { OrderManagePage } from '@/src/modules/order/pages';
import { QuerySearchParams } from '@/src/shared/types';

export interface OrderPageProps {}

function OrderPageRoots({ searchParams }: QuerySearchParams) {
  return <OrderManagePage searchParams={searchParams} />;
}

export default OrderPageRoots;
