import { CourseGrid } from "@/src/components/common";
import CourseItem from "@/src/components/course/CourseItem";
import Heading from "@/src/components/text/Heading";
import createUser from "@/src/lib/actions/user.actions";
import React from "react";

const page = async () => {
  const user = await createUser({
    clerkId: "123456",
    username: "john_doe",
    email_address: "johndoe@gmail.com",
  });
  console.log("🚀 ~ page ~ user:", user);
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </div>
  );
};

export default page;
