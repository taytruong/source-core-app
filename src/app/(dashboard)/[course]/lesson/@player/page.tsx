import { auth } from "@clerk/nextjs/server";
import React from "react";

import { getCourseBySlug } from "@/src/lib/actions/course.action";
import { findAllLessons } from "@/src/lib/actions/lesson.action";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import { Heading } from "@/src/shared/components";

import LessonSaveUrl from "../LessonSaveUrl";
import VideoPlayer from "./VideoPlayer";

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
  const findUser = await getUserInfo({ userId: userId! });
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });

  if (!findCourse) return null;

  const courseId = findCourse?._id.toString();
  const lessonList = await findAllLessons({ course: courseId || "" });

  const lessonDetails = lessonList?.find((element) => element.slug == slug);

  if (!lessonDetails) return null;

  const currentLessonIndex =
    lessonList?.findIndex((element) => element.slug === slug) || 0;

  const previousLesson = lessonList?.[currentLessonIndex - 1];
  const nextLesson = lessonList?.[currentLessonIndex + 1];

  const videoId = lessonDetails.video_url;

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
       />
      <VideoPlayer
        videoId={videoId}
        data={{
          userId: findUser?._id.toString() || "",
          courseId,
        }}
        nextLesson={
          nextLesson ? `/${course}/lesson?slug=${nextLesson?.slug}` : ""
        }
        prevLesson={
          previousLesson ? `/${course}/lesson?slug=${previousLesson?.slug}` : ""
        }
      />

      <Heading className="mb-5 font-semibold">{lessonDetails.title}</Heading>
      <div className="p-5 rounded-lg border border-slate-100 bg-white entry-content">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
         />
      </div>
    </div>
  );
};

export default page;
