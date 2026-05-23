import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import { EUserRole } from "@/src/types/enum";
import PageNotFound from "../../not-found";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN) return <PageNotFound />;
  return <div>{children}</div>;
};

export default AdminLayout;
