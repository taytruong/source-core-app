import { RatingManagePage } from '@/src/modules/rating/pages';
import { Header } from '@/src/shared/components/layout';
import { QuerySearchParams } from '@/src/shared/types';

function RatingPageRoot({ searchParams }: QuerySearchParams) {
  return (
    <>
      <Header title="Quản lý đánh giá" />
      <RatingManagePage searchParams={searchParams} />
    </>
  );
}

export default RatingPageRoot;
