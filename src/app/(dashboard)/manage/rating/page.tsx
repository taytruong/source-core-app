import { getRatings } from '@/src/modules/rating/actions';
import { RatingStatus } from '@/src/shared/constants';

import RatingManage from './rating-manage';

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: RatingStatus;
  };
}) => {
  const ratings = await getRatings({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search || '',
    status: searchParams.status,
  });

  return <RatingManage ratings={ratings} />;
};

export default page;
