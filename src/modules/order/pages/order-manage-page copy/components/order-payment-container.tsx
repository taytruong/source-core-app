import Image from 'next/image';
import Link from 'next/link';

import bankAccountImage from '@/src/assets/bank_account.jpg';
import { OrderItemData } from '@/src/shared/types';
import { cn } from '@/src/shared/utils';

export interface OrderPaymentContainerProps {
  orderDetails: OrderItemData;
}

function OrderPaymentContainer({ orderDetails }: OrderPaymentContainerProps) {
  const bankInfo = [
    { label: 'Bank Name', value: 'ACB (Asia Commercial Joint Stock Bank)' },
    { label: 'Account Number', value: '30465387' },
    { label: 'Account Name', value: 'Truong Duc Nhat Tay' },
    {
      label: 'Price ($)',
      value: orderDetails.amount,
      valueClassName: 'text-logo',
    },
    {
      label: 'Content',
      value: `${orderDetails.code} - ${orderDetails.amount}`,
    },
  ];

  return (
    <div className="bg-item flex flex-col gap-3 rounded-xl p-5 text-sm font-medium lg:text-base">
      <p>
        Thanks for purchasing the course{' '}
        <Link
          className="text-primary font-semibold underline"
          href={`/course/${orderDetails.course.slug}`}
        >
          {orderDetails.course.title} .
        </Link>{' '}
      </p>

      <p>
        Please complete the payment using the account information below with the
        reference code{' '}
        <strong className="text-primary">{orderDetails.code}</strong>
      </p>

      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
        <div className="max-w-150">
          <div className="relative w-full overflow-auto rounded-xl border border-slate-300 p-2">
            <table className="w-full caption-bottom text-xs lg:text-base">
              <tbody className="[&_tr:last-child]:border-0">
                {bankInfo.map((item) => (
                  <tr
                    key={item.label}
                    className="h-12 border-b border-b-slate-200"
                  >
                    <td className="p-3 align-middle">{item.label} :</td>
                    <td
                      className={cn(
                        'p-3 align-middle has-[[role=checkbox]]:pr-0',
                        item.valueClassName,
                      )}
                    >
                      <strong>{item.value}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <strong> OR </strong>
        <Image
          alt="Payment QR Code"
          className="rounded-xl object-cover shadow-sm"
          height={220}
          src={bankAccountImage}
          width={220}
        />
      </div>

      <p className="font-medium">
        If you need support, please contact zalo:{' '}
        <Link
          className="text-primary font-semibold"
          href="https://zalo.me/0707889031"
          target="_blank"
        >
          Nhật Tây
        </Link>
      </p>
    </div>
  );
}

export default OrderPaymentContainer;
