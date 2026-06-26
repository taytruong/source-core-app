import CourseUpdateContent from "@/src/components/course/CourseUpdateContent";
import { getCourseBySlug } from "@/src/lib/actions/course.action";
import { Heading } from "@/src/shared/components";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse) return;
  return (
    <>
      <Heading className="mb-10">
        Nội dung: <strong className="text-primary">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent
        course={JSON.parse(JSON.stringify(findCourse))}
      ></CourseUpdateContent>
    </>
  );
};

export default page;
