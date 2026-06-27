"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import History, { IHistory } from "@/src/database/history.md";
import User from "@/src/database/user.md";
import { TCreateHistoryParams } from "@/src/types";

import { connectToDatabase } from "../mongoose";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({
      clerkId: userId,
    });

    if (!findUser) return;
    await (params.checked ? History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      }) : History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      }));
    revalidatePath(params.path);
  } catch (error) {
    console.log("🚀 ~ createHistory ~ error:", error);
  }
}

export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({
      clerkId: userId,
    });

    if (!findUser) return;
    const histories = await History.find({
      course: params.course,
      user: findUser._id,
    });

    return histories;
  } catch {}
}
