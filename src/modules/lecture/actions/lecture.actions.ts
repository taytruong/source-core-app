'use server';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/src/shared/lib/mongoose';
import { CourseModel, LectureModel } from '@/src/shared/schemas';
import { CreateLectureParams, UpdateLectureParams } from '@/src/types';

export async function createLecture(params: CreateLectureParams) {
  try {
    connectToDatabase();
    //check user role: ADMIN before create lecture
    const findCourse = await CourseModel.findById(params.course);

    if (!findCourse) return;

    const newLecture = await LectureModel.create(params);

    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || '/');

    return {
      success: true,
    };
  } catch {}
}

export async function updateLecture(params: UpdateLectureParams) {
  try {
    connectToDatabase();
    const response = await LectureModel.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );

    revalidatePath(params.updateData.path || '/');
    if (!response) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log('🚀 ~ updateLecture ~ error:', error);
  }
}
