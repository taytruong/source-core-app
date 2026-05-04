import { CourseGrid } from "@/src/components/common";
import CourseItem from "@/src/components/course/CourseItem";
import Heading from "@/src/components/text/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </>
  );
};

export default page;
