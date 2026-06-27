import React from "react";

import { getUserCourses } from "@/src/lib/actions/user.actions";
import { Heading } from "@/src/shared/components";

import StudyCourse from "./StudyCourse";

const page = async () => {
  const courses = await getUserCourses();

  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
       />
    </>
  );
};

export default page;
