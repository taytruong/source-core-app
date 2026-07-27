import { OrderPaymentPage } from '@/src/modules/order/pages/order-payment-page';
import { Header } from '@/src/shared/components/layout';

interface OrderDetailsPageRootProps {
  params: {
    code: string;
  };
}

const OrderDetailsPageRoots = async ({ params }: OrderDetailsPageRootProps) => {
  return (
    <>
      <Header title="Payment Course." />
      <OrderPaymentPage params={params} />
    </>
  );
};

export default OrderDetailsPageRoots;
