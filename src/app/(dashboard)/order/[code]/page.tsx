import PageNotFound from '@/src/app/not-found';
import { getOrderDetails } from '@/src/modules/order/actions';

interface OrderDetailsPageRootProps {
  params: {
    code: string;
  };
}

const OrderDetailsPageRoots = async ({ params }: OrderDetailsPageRootProps) => {
  const orderDetails = await getOrderDetails({
    code: params.code,
  });

  if (!orderDetails) return <PageNotFound />;

  return (
    <div className="flex flex-col gap-5">
      <p>
        Thanks for purchasing the course{' '}
        <strong className="text-primary">{orderDetails.course.title}</strong>{' '}
        with a total amount of{' '}
        <strong className="text-primary">{orderDetails.total}</strong>
      </p>
      <p>
        Please complete the payment using the account information below with the
        reference code{' '}
        <strong className="text-primary">{orderDetails.code}</strong>
      </p>
    </div>
  );
};

export default OrderDetailsPageRoots;
