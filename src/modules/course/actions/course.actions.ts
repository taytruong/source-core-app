'use server';

import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { CourseStatus, RatingStatus } from '@/src/shared/constants';
import { parseData } from '@/src/shared/helper';
import { connectToDatabase } from '@/src/shared/lib';
import {
  CourseModel,
  LectureModel,
  LessonModel,
  RatingModel,
  UserModel,
} from '@/src/shared/schemas';
import {
  CourseLessonDuration,
  CreateCourseParams,
  FilterQueryParams,
  UpdateCourseParams,
} from '@/src/shared/types';

import { CourseItemData } from '../types';

export async function fetchCourse(
  params: FilterQueryParams,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    const { level, limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof CourseModel> = {};

    if (search) {
      // hoặc = lấy ra title của Course
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }

    if (status) {
      query.status = status;
    }

    if (level) {
      query.level = level;
    }

    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });

    return parseData(courses);
  } catch (error) {
    console.log('🚀 ~ fetchCourse ~ error:', error);
  }
}

export async function fetchCourseOfUser(
  userId: string,
): Promise<CourseItemData[] | undefined | null> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: 'lectures',
        model: LectureModel,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: LessonModel,
          select: 'slug',
        },
      },
    });

    if (!findUser) return null;
    const courses = parseData(findUser.courses);

    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchContinueCoursesUser({
  clerkId,
  params,
}: {
  clerkId: string;
  params: FilterQueryParams;
}): Promise<CourseItemData[] | undefined | null> {
  try {
    connectToDatabase();
    const { limit = 5 } = params;
    const findUser = await UserModel.findOne({ clerkId: clerkId }).populate({
      path: 'courses',
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      options: {
        limit: limit,
      },
      populate: {
        path: 'lectures',
        model: LectureModel,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: LessonModel,
          select: '_id slug',
        },
      },
    });

    if (!findUser) return null;
    const courses = parseData(findUser.courses);

    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<CourseItemData | undefined> {
  try {
    connectToDatabase();

    //populate("lectures") when using ref: "Lecture" in course.md.ts
    const findCourse = await CourseModel.findOne({ slug })
      .populate({
        path: 'lectures',
        model: LectureModel,
        select: '_id title', // select để lấy ra trong lectures
        match: {
          _destroy: false,
        },

        // select để lấy ra trong Lesson của lectures
        populate: {
          path: 'lessons',
          model: LessonModel,
          match: {
            _destroy: false,
          },
          options: {
            sort: {
              order: 1,
            },
          },
        },
      })
      .populate({
        path: 'rating',
        model: RatingModel,
        match: {
          status: RatingStatus.ACTIVE,
        },
      });

    return parseData(findCourse) as CourseItemData;
  } catch (error) {
    console.log('🚀 ~ fetchCourseBySlug ~ error:', error);
  }
}

export async function createCourse(params: CreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await CourseModel.findOne({ slug: params.slug });

    if (existCourse) {
      return {
        success: false,
        message: 'Course with this slug already exists',
      };
    }
    const course = await CourseModel.create(params);

    return {
      success: true,
      data: parseData(course),
    };
  } catch (error) {
    console.log('🚀 ~ createCourse ~ error:', error);
  }
}

export async function updateCourse(params: UpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await CourseModel.findOne({ slug: params.slug });

    if (!findCourse) return;
    await CourseModel.findOneAndUpdate(
      { slug: params.slug },
      params.updateData,
      {
        new: true,
      },
    );

    revalidatePath(params.path || '/'); // case when function updateCourse is run so reload link

    return {
      success: true,
      message: 'Update course successfully',
    };
  } catch (error) {
    console.log('🚀 ~ updateCourse ~ error:', error);
  }
}

export async function updateCourseView({ slug }: { slug: string }) {
  try {
    connectToDatabase();
    await CourseModel.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
  } catch (error) {
    console.log('🚀 ~ updateCourseView ~ error:', error);
  }
}

export async function getCourseLessonsInfo({
  slug,
}: {
  slug: string;
}): Promise<CourseLessonDuration | undefined> {
  try {
    connectToDatabase();
    const course: CourseItemData = await CourseModel.findOne({ slug })
      .select('lectures ')
      .populate({
        path: 'lectures',
        select: 'lessons',
        populate: {
          path: 'lessons',
          select: 'duration',
        },
      });
    const lessons = course?.lectures.flatMap((lecture) => lecture.lessons);
    const duration = lessons.reduce(
      (accumulator: number, current) => accumulator + (current?.duration || 0),
      0,
    );

    return { duration, lessons: lessons.length };
  } catch (error) {
    console.log('🚀 ~ getCourseLessonsInfo ~ error:', error);
  }
}
