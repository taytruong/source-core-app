"use client";
import { CourseGrid } from "@/src/components/common";
import CourseItem from "@/src/components/course/CourseItem";
import { lastLessonKey } from "@/src/constanst";
import { ICourse } from "@/src/database/course.md";
import React from "react";

const StudyCourse = ({
  courses,
}: {
  courses: ICourse[] | null | undefined;
}) => {
  if (!courses || courses.length <= 0) return null;
  const lastLesson =
    JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || [];
  //
  return (
    <CourseGrid>
      {courses &&
        courses?.length > 0 &&
        courses?.map((item, index) => {
          const url =
            lastLesson.find((el: any) => el.course === item.slug)?.lesson || "";
          return (
            <CourseItem
              key={item.slug}
              data={item}
              cta="Tiếp tục học"
              url={url}
            ></CourseItem>
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourse;
