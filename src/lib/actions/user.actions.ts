"use server";

import User, { IUser } from "@/src/database/user.modal";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/src/types";

export default async function createUser(
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
