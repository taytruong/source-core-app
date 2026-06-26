import { getUserCourses } from "@/src/lib/actions/user.actions";
import React from "react";
import StudyCourse from "./StudyCourse";
import { Heading } from "@/src/shared/components";

const page = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></StudyCourse>
    </>
  );
};

export default page;
