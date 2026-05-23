"use server";

import User, { IUser } from "@/src/database/user.modal";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/src/types";

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
