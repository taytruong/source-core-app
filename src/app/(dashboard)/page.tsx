import CourseItem from "@/src/components/course/CourseItem";
import { getAllCoursePublic } from "@/src/lib/actions/course.action";
import { CourseGrid, Heading } from "@/src/shared/components";
import React from "react";

const page = async () => {
  const courses = (await getAllCoursePublic({})) || [];
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.length > 0 &&
          courses?.map((item) => (
            <CourseItem key={item.slug} data={item}></CourseItem>
          ))}
      </CourseGrid>
    </div>
  );
};

export default page;
