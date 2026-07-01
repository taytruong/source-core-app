import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import { getUserInfo } from '@/src/modules/user/actions';
import { UserRole } from '@/src/shared/constants';

import PageNotFound from '../../not-found';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return redirect('/sign-in');
  const user = await getUserInfo({ userId });

  if (user && user.role !== UserRole.ADMIN) return <PageNotFound />;

  return <div>{children}</div>;
};

export default AdminLayout;
