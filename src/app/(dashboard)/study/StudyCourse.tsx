"use client";
import CourseItem from "@/src/components/course/CourseItem";
import { lastLessonKey } from "@/src/shared/constants";
import { CourseGrid } from "@/src/shared/components";
import { StudyCourseProps } from "@/src/types";
import React from "react";

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
      {courses &&
        courses?.length > 0 &&
        courses?.map((item) => {
          const url =
            lastLesson.find((el: any) => el.course === item.slug)?.lesson || "";
          const firstLessonUrl = item.lectures[0].lessons[0].slug;
          return (
            <CourseItem
              key={item.slug}
              data={item}
              cta="Tiếp tục học"
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
            ></CourseItem>
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourse;
