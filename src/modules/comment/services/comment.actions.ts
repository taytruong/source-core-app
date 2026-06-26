"use server";

import User from "@/src/database/user.md";
import { connectToDatabase } from "@/src/shared/lib/mongoose";
import { ICommentItem } from "@/src/types";
import { revalidatePath } from "next/cache";
import CommentSchema, { Comment } from "./comment.schema";

export async function createComment(params: {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
  path?: string;
}): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newComment = await CommentSchema.create(params);
    revalidatePath(params.path || "/");
    if (!newComment) return false;
    return true;
  } catch (error) {
    console.log("🚀 ~ createComment ~ error:", error);
  }
}

export async function getCommentsByLesson(
  lessonId: string,
  sort: "recent" | "oldest" = "recent",
): Promise<ICommentItem[] | undefined> {
  try {
    connectToDatabase();
    const comments = await CommentSchema.find<Comment>({
      lesson: lessonId,
    })
      .sort({ create_at: sort === "recent" ? -1 : 1 })
      .populate({
        path: "user",
        model: User,
        select: "name avatar",
      });

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log("🚀 ~ getCommentsByLesson ~ error:", error);
  }
}
