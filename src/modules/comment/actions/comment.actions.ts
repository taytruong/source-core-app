'use server';

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/src/shared/lib/mongoose';
import { CommentModel, UserModel } from '@/src/shared/schemas';
import { CommentItem } from '@/src/types';

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
    const newComment = await CommentModel.create(params);

    revalidatePath(params.path || '/');
    if (!newComment) return false;

    return true;
  } catch (error) {
    console.log('🚀 ~ createComment ~ error:', error);
  }
}

export async function getCommentsByLesson(
  lessonId: string,
  sort: 'recent' | 'oldest' = 'recent',
): Promise<CommentItem[] | undefined> {
  try {
    connectToDatabase();
    const comments = await CommentModel.find<CommentItem>({
      lesson: lessonId,
    })
      .sort({ create_at: sort === 'recent' ? -1 : 1 })
      .populate({
        path: 'user',
        model: UserModel,
        select: 'name avatar',
      });

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log('🚀 ~ getCommentsByLesson ~ error:', error);
  }
}
