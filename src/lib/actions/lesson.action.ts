"use server";
import { revalidatePath } from "next/cache";

import Course from "@/src/database/course.md";
import Lecture, { ILecture } from "@/src/database/lecture.md";
import Lesson, { ILesson } from "@/src/database/lesson.md";
import { TCreateLessonParams, TUpdateLessonParams } from "@/src/types";

import { connectToDatabase } from "../mongoose";

export async function createLesson(params: TCreateLessonParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);

    if (!findCourse) return;

    const findLecture = await Lecture.findById(params.lecture);

    if (!findLecture) return;

    const newLesson = await Lesson.create(params);

    findLecture.lessons.push(newLesson._id);
    await findLecture.save();

    revalidatePath(params.path || "/");
    if (!newLesson) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ createLesson ~ error:", error);
  }
}

export async function updateLesson(params: TUpdateLessonParams) {
  try {
    connectToDatabase();
    const res = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true },
    );

    revalidatePath(params.path || "/");
    if (!res) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ createLesson ~ error:", error);
  }
}

export async function getLessonBySlug({
  course,
  slug,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.findOne({
      slug,
      course,
    }).select("title video_url content"); //select là lấy riêng dc các field cần thiết

    return findLesson;
  } catch (error) {
    console.log("🚀 ~ createLesson ~ error:", error);
  }
}

export async function findAllLessons({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectToDatabase();
    const lessons = await Lesson.find({
      course,
    }).select("title video_url content slug");

    return lessons;
  } catch (error) {
    console.log("🚀 ~ createLesson ~ error:", error);
  }
}

export async function countLessonByCourseId({
  course: courseId,
}: {
  course: string;
}): Promise<number | undefined> {
  try {
    connectToDatabase();
    const count = await Lesson.countDocuments({ course: courseId });

    return count || 0;
  } catch (error) {
    console.log("🚀 ~ createLesson ~ error:", error);
  }
}
