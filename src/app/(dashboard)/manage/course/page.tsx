import React from "react";

import CourseManage from "@/src/components/course/CourseManage";
import { getAllCourse } from "@/src/lib/actions/course.action";
import { ITEM_PER_PAGE } from "@/src/shared/constants";
import { ECourseStatus } from "@/src/types/enum";

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
      total={total}
      totalPages={totalPages}
     />
  );
};

export default page;
