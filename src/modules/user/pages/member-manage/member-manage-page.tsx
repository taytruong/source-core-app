import { ITEM_PER_PAGE } from '@/src/shared/constants';
import { QuerySearchParams } from '@/src/shared/types';
import { fetchAllUsers } from '../../actions';
import MemberManageContainer from './components';

export interface MemberManagePageProps {}

async function MemberManagePage({ searchParams }: QuerySearchParams) {
  const data = await fetchAllUsers({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
    role: searchParams.role,
    sort: searchParams.sort,
  });
  if (!data) return null;

  return (
    <MemberManageContainer
      users={data?.users}
      total={data?.total}
    />
  );
}

export default MemberManagePage;
