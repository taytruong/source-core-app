'use server';

import { CourseProps } from '@/src/modules/course/types';
import { CourseStatus } from '@/src/shared/constants';
import { connectToDatabase } from '@/src/shared/lib/mongoose';
import {
  CourseModel,
  LectureModel,
  LessonModel,
  UserModel,
} from '@/src/shared/schemas';
import { UserModelProps } from '@/src/shared/types';
import { TCreateUserParams } from '@/src/types';

export async function createUser(
  params: TCreateUserParams,
): Promise<TCreateUserParams | undefined> {
  try {
    connectToDatabase();
    const newUser: TCreateUserParams = await UserModel.create(params);

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<UserModelProps | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId });

    if (!findUser._id) return null;

    return JSON.parse(JSON.stringify(findUser));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourses(
  userId: string,
): Promise<CourseProps[] | undefined | null> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: 'lectures',
        model: LectureModel,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: LessonModel,
          select: 'slug',
        },
      },
    });

    if (!findUser) return null;
    const courses = JSON.parse(JSON.stringify(findUser.courses));

    return courses;
  } catch (error) {
    console.log(error);
  }
}
