'use server';

import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { CourseStatus, RatingStatus } from '@/src/shared/constants';
import { connectToDatabase } from '@/src/shared/lib/mongoose';
import {
  CourseModel,
  LectureModel,
  LessonModel,
  RatingModel,
  UserModel,
} from '@/src/shared/schemas';
import {
  CourseLessonDuration,
  CourseModelProps,
  FilterQueryParams,
} from '@/src/shared/types';
import {
  CreateCourseParams,
  GetAllCourseParams,
  StudyCourseProps,
  UpdateCourseParams,
} from '@/src/types';

import { CourseProps } from '../types';

export async function fetchCourseDashboard(
  params: FilterQueryParams,
): Promise<CourseModelProps[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof CourseModel> = {};

    if (search) {
      // hoặc = lấy ra title của Course
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    query.status = CourseStatus.APPROVED;
    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log('🚀 ~ fetchCourseDashboard ~ error:', error);
  }
}

export async function fetchCourseOfUser(
  userId: string,
): Promise<CourseProps[] | undefined | null> {
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
    const courses = JSON.parse(JSON.stringify(findUser.courses));

    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<CourseProps | undefined> {
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
        },
      })
      .populate({
        path: 'rating',
        model: RatingModel,
        match: {
          status: RatingStatus.ACTIVE,
        },
      });

    return JSON.parse(JSON.stringify(findCourse)) as CourseProps;
  } catch (error) {
    console.log('🚀 ~ fetchCourseBySlug ~ error:', error);
  }
}

export async function getAllCoursePublic(
  params: GetAllCourseParams,
): Promise<StudyCourseProps[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof CourseModel> = {};

    if (search) {
      // hoặc = lấy ra title của Course
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    query.status = CourseStatus.APPROVED;
    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log('🚀 ~ getAllCourse ~ error:', error);
  }
}

export async function createCourse(params: CreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await CourseModel.findOne({ slug: params.slug });

    if (existCourse) {
      return {
        success: false,
        message: 'Đường dẫn khóa học đã tồn tại!',
      };
    }
    const course = await CourseModel.create(params);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
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
      message: 'Cập nhật khóa học thành công!',
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
    const course: CourseProps = await CourseModel.findOne({ slug })
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
