import React from "react";

import CourseItem from "@/src/components/course/CourseItem";
import { getAllCoursePublic } from "@/src/lib/actions/course.action";
import { CourseGrid, Heading } from "@/src/shared/components";

const page = async () => {
  const courses = (await getAllCoursePublic({})) || [];

  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.length > 0 &&
          courses?.map((item) => (
            <CourseItem key={item.slug} data={item} />
          ))}
      </CourseGrid>
    </div>
  );
};

export default page;
