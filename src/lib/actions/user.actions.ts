"use server";

import { auth } from "@clerk/nextjs/server";

import Course, { ICourse } from "@/src/database/course.md";
import Lecture from "@/src/database/lecture.md";
import Lesson from "@/src/database/lesson.md";
import User, { IUser } from "@/src/database/user.md";
import { TCreateUserParams } from "@/src/types";
import { ECourseStatus } from "@/src/types/enum";

import { connectToDatabase } from "../mongoose";

export async function createUser(
  params: TCreateUserParams,
): Promise<TCreateUserParams | undefined> {
  try {
    connectToDatabase();
    const newUser: TCreateUserParams = await User.create(params);

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId });

    if (!findUser) return null;

    return findUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: {
        status: ECourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: Lecture,
        select: "lessons",
        populate: {
          path: "lessons",
          model: Lesson,
          select: "slug",
        },
      },
    });

    if (!findUser) return null;

    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}
