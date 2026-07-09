'use server';

import { CourseItemData } from '@/src/modules/course/types';
import { CourseStatus } from '@/src/shared/constants';
import { parseData } from '@/src/shared/helper';
import { connectToDatabase } from '@/src/shared/lib';
import {
  CourseModel,
  LectureModel,
  LessonModel,
  UserModel,
} from '@/src/shared/schemas';
import { CreateUserParams, UserModelProps } from '@/src/shared/types';

export async function createUser(
  params: CreateUserParams,
): Promise<CreateUserParams | undefined> {
  try {
    connectToDatabase();
    const newUser: CreateUserParams = await UserModel.create(params);

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

    if (!findUser) return null;

    return parseData(findUser);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourses(
  userId: string,
): Promise<CourseItemData[] | undefined | null> {
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
    const courses = parseData(findUser.courses);

    return courses;
  } catch (error) {
    console.log(error);
  }
}
