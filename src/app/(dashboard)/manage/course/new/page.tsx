import CourseNewAdd from "@/src/components/course/CourseNewAdd";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import { Heading } from "@/src/shared/components";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });
  if (!mongoUser) return null;
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CourseNewAdd user={JSON.parse(JSON.stringify(mongoUser))}></CourseNewAdd>
    </>
  );
};

export default page;
