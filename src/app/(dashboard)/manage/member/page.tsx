import { fetchRatings } from '@/src/modules/rating/actions';
import { MemberManagePage } from '@/src/modules/user/pages';
import { Header } from '@/src/shared/components/layout';
import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';

const MemberPageRoots = async ({ searchParams }: QuerySearchParams) => {
  const data = await fetchRatings({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
    sort: searchParams.sort,
  });

  return (
    <>
      <Header title="Manage Members." />
      <MemberManagePage searchParams={searchParams} />
    </>
  );
};

export default MemberPageRoots;
