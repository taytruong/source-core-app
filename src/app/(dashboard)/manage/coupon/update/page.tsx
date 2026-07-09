import { UpdateCouponPage } from '@/src/modules/coupon/pages';
import { Header } from '@/src/shared/components/layout';

export interface UpdateCouponPageRootProps {
  searchParams: {
    code: string;
  };
}

function UpdateCouponPageRoot({ searchParams }: UpdateCouponPageRootProps) {
  return (
    <>
      <Header title="Cập nhật mã giảm giá" />
      <UpdateCouponPage code={searchParams.code} />
    </>
  );
}

export default UpdateCouponPageRoot;
