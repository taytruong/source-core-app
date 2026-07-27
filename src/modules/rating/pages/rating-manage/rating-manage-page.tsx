import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

import { fetchRatings } from '../../actions';
import RatingManageContainer from './components';

async function RatingManagePage({ searchParams }: QuerySearchParams) {
  const data = await fetchRatings({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
    sort: searchParams.sort,
  });

  if (!data) return null;
  const { ratings, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  return (
    <RatingManageContainer
      ratings={ratings}
      total={total}
      totalPages={totalPages}
    />
  );
}

export default RatingManagePage;
