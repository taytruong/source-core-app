import PageNotFound from "@/src/app/not-found";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";
import LoadingOutline from "./@outline/LoadingOutline";
import LessonWrapper from "./LessonWrapper";

const Layout = async ({
  player,
  outline,
  comment,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
  comment: React.ReactNode;
}) => {
  const { userId } = await auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>
        <div>
          {player}
          {comment}
        </div>
      </Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  );
};

export default Layout;
