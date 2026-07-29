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
import {
  CreateUserParams,
  FilterQueryParams,
  getSortOption,
  UpdateRoleParams,
  UpdateStatusUserParams,
  UserModelProps,
} from '@/src/shared/types';
import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

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

export async function fetchAllUsers(
  params: FilterQueryParams,
): Promise<{ users: UserModelProps[]; total: number } | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, sort, status, role } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof UserModel> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }
    if (role) {
      query.role = role;
    }

    const users = await UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort(getSortOption(sort));

    const total = await UserModel.countDocuments(query);
    return {
      users: JSON.parse(JSON.stringify(users)),
      total,
    };
  } catch (error) {
    console.log('🚀 ~ fetchAllUsers ~ error:', error);
  }
}

export async function updateRole(params: UpdateRoleParams) {
  try {
    connectToDatabase();
    await UserModel.findOneAndUpdate(
      { _id: params.userId },
      { role: params.updateData.role },
      {
        new: true,
      },
    );

    revalidatePath(params.path || '/');

    return {
      success: true,
      message: 'Update role successfully',
    };
  } catch (error) {
    console.log('🚀 ~ updateRole ~ error:', error);
  }
}

export async function updateStatusUser(params: UpdateStatusUserParams) {
  try {
    connectToDatabase();
    const findCourse = await UserModel.findOne({ _id: params.userId });

    if (!findCourse) return;
    await UserModel.findOneAndUpdate(
      { _id: params.userId },
      params.updateData,
      {
        new: true,
      },
    );

    revalidatePath(params.path || '/');

    return {
      success: true,
      message: 'Update user successfully',
    };
  } catch (error) {
    console.log('🚀 ~ updateUser ~ error:', error);
  }
}
