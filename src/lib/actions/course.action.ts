"use server";
import {
  StudyCourseProps,
  TCourseUpdateParams,
  TCreateCourseParams,
  TFilterData,
  TGetAllCourseParams,
  TUpdateCourseParams,
} from "@/src/types";
import { connectToDatabase } from "../mongoose";
import { QueryFilter } from "mongoose";
import Course, { ICourse } from "@/src/database/course.md";
import { revalidatePath } from "next/cache";
import Lecture from "@/src/database/lecture.md";
import Lesson from "@/src/database/lesson.md";
import { ECourseStatus, ERatingStatus } from "@/src/types/enum";
import Rating from "@/src/database/rating.md";

export async function getAllCourse(params: TFilterData): Promise<
  | {
      courses: ICourse[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof Course> = {};
    if (search) {
      // hoặc = lấy ra title của Course
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });

    const total = await Course.countDocuments(query);

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      total,
    };
  } catch (error) {
    console.log("🚀 ~ getAllCourse ~ error:", error);
  }
}

export async function getAllCoursePublic(
  params: TGetAllCourseParams,
): Promise<StudyCourseProps[] | undefined> {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof Course> = {};
    if (search) {
      // hoặc = lấy ra title của Course
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    query.status = ECourseStatus.APPROVED;
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });
    return JSON.parse(JSON.stringify(courses));
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
    const findCourse = await Course.findOne({ slug })
      .populate({
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
      })
      .populate({
        path: "rating",
        model: Rating,
        match: {
          status: ERatingStatus.ACTIVE,
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

export async function updateCourseView({ slug }: { slug: string }) {
  try {
    connectToDatabase();
    await Course.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
  } catch (error) {}
}

export async function getCourseLessonsInfo({ slug }: { slug: string }): Promise<
  | {
      duration: number;
      lessons: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const course = await Course.findOne({ slug })
      .select("lectures ")
      .populate({
        path: "lectures",
        select: "lessons",
        populate: {
          path: "lessons",
          select: "duration",
        },
      });
    const lessons = course?.lectures.map((l: any) => l.lessons).flat();
    const duration = lessons.reduce(
      (acc: number, cur: any) => acc + (cur?.duration || 0),
      0,
    );
    return { duration, lessons: lessons.length };
  } catch (error) {}
}
