'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/src/shared/lib/mongoose';
import { HistoryModel, UserModel } from '@/src/shared/schemas';
import { HistoryModelProps } from '@/src/shared/types';
import { CreateHistoryParams } from '@/src/types';

export async function createHistory(params: CreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await UserModel.findOne({
      clerkId: userId,
    });

    if (!findUser) return;
    await (params.checked
      ? HistoryModel.create({
          course: params.course,
          lesson: params.lesson,
          user: findUser._id,
        })
      : HistoryModel.findOneAndDelete({
          course: params.course,
          lesson: params.lesson,
          user: findUser._id,
        }));
    revalidatePath(params.path);
  } catch (error) {
    console.log('🚀 ~ createHistory ~ error:', error);
  }
}

export async function getHistory(params: {
  course: string;
}): Promise<HistoryModelProps[] | undefined> {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await UserModel.findOne({
      clerkId: userId,
    });

    if (!findUser) return;
    const histories = await HistoryModel.find({
      course: params.course,
      user: findUser._id,
    });

    return histories;
  } catch (error) {
    console.log('🚀 ~ getHistory ~ error:', error);
  }
}
