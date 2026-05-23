import CouresManage from "@/src/components/course/CouresManage";
import { getAllCourse } from "@/src/lib/actions/course.action";
import React from "react";

const page = async () => {
  const courses = await getAllCourse();
  return (
    <CouresManage
      courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
    ></CouresManage>
  );
};

export default page;
