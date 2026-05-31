import { getCourseBySlug } from "@/src/lib/actions/course.action";
import {
  findAllLessons,
  getLessonBySlug,
} from "@/src/lib/actions/lesson.action";

import React from "react";
import LessonNavigation from "./LessonNavigation";
import { TUpdateCourseLecture } from "@/src/types";

import LessonItem from "@/src/components/lesson/LessonItem";
import { Heading } from "@/src/components/common";
import LessonContent from "@/src/components/lesson/LessonContent";

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
  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId || "",
  });

  const LessonList = await findAllLessons({ course: courseId || "" });

  if (!lessonDetails) return null;

  const currentLessonIndex =
    LessonList?.findIndex((el) => el.slug === lessonDetails?.slug) || 0;

  const prevLesson = LessonList?.[currentLessonIndex - 1];
  const nextLesson = LessonList?.[currentLessonIndex + 1];

  const videoId = lessonDetails.video_url?.split("v=").at(-1);
  const lectures = findCourse.lectures || [];

  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <LessonNavigation
            nextLesson={
              !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
            }
            prevLesson={
              !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
            }
          />
          <div></div>
        </div>
        <Heading className="mb-5">{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg border border-slate-100 bg-white entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
        <LessonContent lectures={lectures} course={course} slug={slug} />
      </div>
    </div>
  );
};

export default page;
