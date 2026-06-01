import { getCourseBySlug } from "@/src/lib/actions/course.action";
import {
  findAllLessons,
  getLessonBySlug,
} from "@/src/lib/actions/lesson.action";

import React from "react";
import LessonNavigation from "./LessonNavigation";
import { Heading } from "@/src/components/common";
import LessonContent from "@/src/components/lesson/LessonContent";
import { getHistory } from "@/src/lib/actions/history.action";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import PageNotFound from "@/src/app/not-found";
import { EUserRole } from "@/src/types/enum";
import LessonSaveUrl from "./LessonSaveUrl";

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
  const { userId } = await auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;

  const course = params.course;
  const slug = searchParams.slug;

  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;

  const courseId = findCourse?._id.toString();

  if (
    !findUser.courses.includes(courseId as any)
    // && findUser.role !== EUserRole.ADMIN
  )
    return <PageNotFound />;

  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId || "",
  });

  const lessonList = await findAllLessons({ course: courseId || "" });

  if (!lessonDetails) return null;

  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetails?.slug) || 0;

  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const nextLesson = lessonList?.[currentLessonIndex + 1];

  const videoId = lessonDetails.video_url?.split("v=").at(-1);
  const lectures = findCourse.lectures || [];

  const histories = await getHistory({ course: courseId });
  const completePercent =
    ((histories?.length || 0) / (lessonList?.length || 1)) * 100;

  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen items-start">
      <LessonSaveUrl
        url={`/${course}/lesson?slug=${slug}`}
        course={course}
      ></LessonSaveUrl>
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill rounded-xl"
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
        <Heading className="mb-5 font-semibold">{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg border border-slate-100 bg-white entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
        <div className="relative overflow-hidde h-3 w-full rounded-full border border-slate-200 bg-white mb-2">
          <div
            className="w-0 h-full rounded-full bg-yellow-400 transition-all duration-500"
            style={{
              width: `${completePercent}%`,
            }}
          ></div>
          <span
            className={`absolute inset-0 z-10 flex items-center justify-center text-xs font-medium ${
              completePercent > 50 ? "text-white" : "text-black"
            }`}
          >
            {completePercent}%
          </span>
        </div>
        <LessonContent
          lectures={lectures}
          course={course}
          slug={slug}
          histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        />
      </div>
    </div>
  );
};

export default page;
