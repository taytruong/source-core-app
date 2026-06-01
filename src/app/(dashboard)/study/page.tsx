import { CourseGrid, Heading } from "@/src/components/common";
import CourseItem from "@/src/components/course/CourseItem";
import { getUserCourses } from "@/src/lib/actions/user.actions";
import React from "react";

const page = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        {courses &&
          courses?.length > 0 &&
          courses?.map((item, index) => (
            <CourseItem
              key={item.slug}
              data={item}
              cta="Tiếp tục học"
            ></CourseItem>
          ))}
      </CourseGrid>
    </>
  );
};

export default page;
