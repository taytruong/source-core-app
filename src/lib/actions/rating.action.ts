"use server";

import { QueryFilter } from "mongoose";
import { revalidatePath } from "next/cache";

import Course from "@/src/database/course.md";
import Rating from "@/src/database/rating.md";
import { TCreateRatingParams, TFilterData, TRatingItem } from "@/src/types";
import { ERatingStatus } from "@/src/types/enum";

import { connectToDatabase } from "../mongoose";

export async function createRating(
  params: TCreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await Rating.create(params);
    const findCourse = await Course.findOne({ _id: params.course }).populate({
      path: "rating",
      model: Rating,
    });

    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    if (!newRating) return false;

    return true;
  } catch (error) {
    console.log("🚀 ~ createRating ~ error:", error);
  }
}

export async function getRatingByUserId(
  userId: string,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const findRating = await Rating.findOne({ user: userId });

    return findRating?._id ? true : false;
  } catch (error) {
    console.log("🚀 ~ getRatingByUserId ~ error:", error);
  }
}

export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndUpdate(id, { status: ERatingStatus.ACTIVE });
    revalidatePath("/manage/rating");

    return true;
  } catch (error) {
    console.log("🚀 ~ deleteRating ~ error:", error);
  }
}

export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndDelete(id);
    revalidatePath("/manage/rating");

    return true;
  } catch (error) {
    console.log("🚀 ~ deleteRating ~ error:", error);
  }
}

export async function getRatings(
  params: TFilterData,
): Promise<TRatingItem | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof Rating> = {};

    if (search) {
      // hoặc = lấy ra content của Rating
      query.$or = [{ content: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await Rating.find(query)
      .populate({
        path: "course",
        select: "title slug",
      })
      .populate({
        path: "user",
        select: "name",
      })
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });

    return JSON.parse(JSON.stringify(ratings));
  } catch (error) {
    console.log("🚀 ~ getRatings ~ error:", error);
  }
}
