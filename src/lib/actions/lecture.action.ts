"use server";
import { TCreateLectureParams, TUpdateLectureParams } from "@/src/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/src/database/course.md";
import Lecture from "@/src/database/lecture.md";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectToDatabase();
    //check user role: ADMIN before create lecture
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;

    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {}
}

export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectToDatabase();
    const res = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );
    revalidatePath(params.updateData.path || "/");
    if (!res) return;
    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ updateLecture ~ error:", error);
  }
}
