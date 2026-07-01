'use server';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/src/shared/lib/mongoose';
import { CourseModel, LectureModel, LessonModel } from '@/src/shared/schemas';
import { LessonModelProps } from '@/src/shared/types';
import { CreateLessonParams, UpdateLessonParams } from '@/src/types';

export async function createLesson(params: CreateLessonParams) {
  try {
    connectToDatabase();
    const findCourse = await CourseModel.findById(params.course);

    if (!findCourse) return;

    const findLecture = await LectureModel.findById(params.lecture);

    if (!findLecture) return;

    const newLesson = await LessonModel.create(params);

    findLecture.lessons.push(newLesson._id);
    await findLecture.save();

    revalidatePath(params.path || '/');
    if (!newLesson) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log('🚀 ~ createLesson ~ error:', error);
  }
}

export async function updateLesson(params: UpdateLessonParams) {
  try {
    connectToDatabase();
    const respone = await LessonModel.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true },
    );

    revalidatePath(params.path || '/');
    if (!respone) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log('🚀 ~ updateLesson ~ error:', error);
  }
}

export async function getLessonBySlug({
  course,
  slug,
}: {
  slug: string;
  course: string;
}): Promise<LessonModelProps | undefined> {
  try {
    connectToDatabase();
    const findLesson = await LessonModel.findOne({
      slug,
      course,
    }).select('title video_url content'); //select là lấy riêng dc các field cần thiết

    return findLesson;
  } catch (error) {
    console.log('🚀 ~ getLessonBySlug ~ error:', error);
  }
}

export async function findAllLessons({
  course,
}: {
  course: string;
}): Promise<LessonModelProps[] | undefined> {
  try {
    connectToDatabase();
    const lessons = await LessonModel.find({
      course,
    }).select('title video_url content slug');

    return lessons;
  } catch (error) {
    console.log('🚀 ~ findAllLessons ~ error:', error);
  }
}

export async function countLessonByCourseId({
  course: courseId,
}: {
  course: string;
}): Promise<number | undefined> {
  try {
    connectToDatabase();
    const count = await LessonModel.countDocuments({ course: courseId });

    return count || 0;
  } catch (error) {
    console.log('🚀 ~ countLessonByCourseId ~ error:', error);
  }
}
