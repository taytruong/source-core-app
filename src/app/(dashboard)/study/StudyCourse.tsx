"use client";
import React from "react";

import CourseItem from "@/src/components/course/CourseItem";
import { CourseGrid } from "@/src/shared/components";
import { lastLessonKey } from "@/src/shared/constants";
import { StudyCourseProps } from "@/src/types";

const StudyCourse = ({
  courses,
}: {
  courses: StudyCourseProps[] | null | undefined;
}) => {
  if (!courses || courses.length <= 0) return null;
  let lastLesson = [];

  if (typeof localStorage !== "undefined") {
    lastLesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || []
      : [];
  }

  return (
    <CourseGrid>
      {!!courses && courses?.length > 0 && courses?.map((item) => {
          const url =
            lastLesson.find((element: any) => element.course === item.slug)?.lesson || "";
          const firstLessonUrl = item.lectures[0].lessons[0].slug;

          return (
            <CourseItem
              key={item.slug}
              cta="Tiếp tục học"
              data={item}
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
             />
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourse;
