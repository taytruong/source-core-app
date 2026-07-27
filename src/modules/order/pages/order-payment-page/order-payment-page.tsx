import PageNotFound from '@/src/app/not-found';

import { getOrderDetails } from '../../actions';
import OrderPaymentContainer from './components';

export interface OrderPaymentPageProps {
  params: {
    code: string;
  };
}

async function OrderPaymentPage({ params }: OrderPaymentPageProps) {
  const orderDetails = await getOrderDetails({
    code: params.code,
  });

  if (!orderDetails) return <PageNotFound />;

  return <OrderPaymentContainer orderDetails={orderDetails} />;
}

export default OrderPaymentPage;
