"use server";

import Rating from "@/src/database/rating.md";
import { connectToDatabase } from "../mongoose";
import { TCreateRatingParams } from "@/src/types";

export async function createRating(
  params: TCreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await Rating.create(params);
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
