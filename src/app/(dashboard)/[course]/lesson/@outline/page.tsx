import React from "react";

import LessonContent from "@/src/components/lesson/LessonContent";
import { getCourseBySlug } from "@/src/lib/actions/course.action";
import { getHistory } from "@/src/lib/actions/history.action";
import { countLessonByCourseId } from "@/src/lib/actions/lesson.action";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });

  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ course: courseId });
  const completePercent = Math.floor(
    ((histories?.length || 0) / (lessonCount || 1)) * 100,
  );

  return (
    <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="relative overflow-hidde h-3 w-full rounded-full border border-slate-200 bg-white mb-2">
        <div
          className="w-0 h-full rounded-full bg-linear-to-r from-primary to-yellow-400 transition-all duration-500"
          style={{
            width: `${completePercent}%`,
          }}
         />
        <span
          className={`absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold ${
            completePercent > 50 ? "text-white" : "text-black"
          }`}
        >
          {completePercent}%
        </span>
      </div>
      <LessonContent
        course={course}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        lectures={lectures}
        slug={slug}
      />
    </div>
  );
};

export default page;
