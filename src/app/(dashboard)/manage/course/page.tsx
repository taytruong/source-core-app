import CourseManage from "@/src/components/course/CourseManage";
import { ITEM_PER_PAGE } from "@/src/shared/constants";
import { getAllCourse } from "@/src/lib/actions/course.action";
import { ECourseStatus } from "@/src/types/enum";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) => {
  const data = await getAllCourse({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search || "",
    status: searchParams.status,
  });

  if (!data) return null;
  const { courses, total } = data;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  return (
    <CourseManage
      courses={courses}
      totalPages={totalPages}
      total={total}
    ></CourseManage>
  );
};

export default page;
