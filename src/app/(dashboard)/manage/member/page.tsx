import { MemberManagePage } from '@/src/modules/user/pages';
import { Header } from '@/src/shared/components/layout';
import { QuerySearchParams } from '@/src/shared/types';

const MemberPageRoots = async ({ searchParams }: QuerySearchParams) => {
  return (
    <>
      <Header title="Manage Members." />
      <MemberManagePage searchParams={searchParams} />
    </>
  );
};

export default MemberPageRoots;
