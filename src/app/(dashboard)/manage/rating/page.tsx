import { RatingManagePage } from '@/src/modules/rating/pages';
import { QuerySearchParams } from '@/src/shared/types';

function RatingPageRoot({ searchParams }: QuerySearchParams) {
  return <RatingManagePage searchParams={searchParams} />;
}

export default RatingPageRoot;
