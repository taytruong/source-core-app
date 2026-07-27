'use server';

import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { RatingStatus } from '@/src/shared/constants';
import { connectToDatabase } from '@/src/shared/lib';
import { CourseModel, RatingModel } from '@/src/shared/schemas';
import { FilterQueryParams, getSortOption } from '@/src/shared/types';
import {
  CreateRatingParams,
  RatingItemData,
} from '@/src/shared/types/rating.type';

export async function createRating(
  params: CreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await RatingModel.create(params);
    const findCourse = await CourseModel.findOne({
      _id: params.course,
    }).populate({
      path: 'rating',
      model: RatingModel,
    });

    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    if (!newRating) return false;

    return true;
  } catch (error) {
    console.log('🚀 ~ createRating ~ error:', error);
  }
}

export async function getRatingByUserId(
  userId: string,
  courseId: string,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const findRating = await RatingModel.findOne({
      user: userId,
      course: courseId,
    });

    return findRating?._id ? true : false;
  } catch (error) {
    console.log('🚀 ~ getRatingByUserId ~ error:', error);
  }
}

export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await RatingModel.findByIdAndUpdate(id, { status: RatingStatus.ACTIVE });
    revalidatePath('/manage/rating');

    return true;
  } catch (error) {
    console.log('🚀 ~ updateRating ~ error:', error);
  }
}

export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await RatingModel.findByIdAndDelete(id);
    revalidatePath('/manage/rating');

    return true;
  } catch (error) {
    console.log('🚀 ~ deleteRating ~ error:', error);
  }
}

export async function fetchRatings(
  params: FilterQueryParams,
): Promise<{ ratings: RatingItemData[]; total: number } | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, sort, status } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof RatingModel> = {};

    if (search) {
      // hoặc = lấy ra content của Rating
      query.$or = [{ content: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await RatingModel.find(query)
      .populate({
        path: 'course',
        select: 'title slug',
      })
      .populate({
        path: 'user',
        select: 'name',
      })
      .skip(skip)
      .limit(limit)
      .sort(getSortOption(sort));

    const total = await RatingModel.countDocuments(query);

    return {
      ratings: JSON.parse(JSON.stringify(ratings)),
      total,
    };
  } catch (error) {
    console.log('🚀 ~ getRatings ~ error:', error);
  }
}
