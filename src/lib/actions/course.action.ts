"use server";
import {
  TCourseUpdateParams,
  TCreateCourseParams,
  TUpdateCourseParams,
} from "@/src/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/src/database/course.md";
import { revalidatePath } from "next/cache";
import Lecture from "@/src/database/lecture.md";
import Lesson from "@/src/database/lesson.md";

export async function getAllCourse(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log("🚀 ~ getAllCourse ~ error:", error);
  }
}

export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> {
  try {
    connectToDatabase();

    //populate("lectures") when using ref: "Lecture" in course.md.ts
    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: Lecture,
      select: "_id title", // select để lấy ra trong lectures
      match: {
        _destroy: false,
      },

      // select để lấy ra trong Lesson của lectures
      populate: {
        path: "lessons",
        model: Lesson,
        match: {
          _destroy: false,
        },
      },
    });
    return findCourse;
  } catch (error) {
    console.log("🚀 ~ getCourseBySlug ~ error:", error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại!",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log("🚀 ~ createCourse ~ error:", error);
  }
}

export async function updateCourse(params: TUpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });

    revalidatePath(params.path || "/"); // case when function updateCourse is run so reload link

    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log("🚀 ~ updateCourse ~ error:", error);
  }
}
