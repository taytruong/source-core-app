'use server';

import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { CourseStatus, RatingStatus } from '@/src/shared/constants';
import { parseData } from '@/src/shared/helper';
import { connectToDatabase } from '@/src/shared/lib';
import {
  CourseModel,
  HistoryModel,
  LectureModel,
  LessonModel,
  RatingModel,
  UserModel,
} from '@/src/shared/schemas';
import {
  CourseLessonDuration,
  CreateCourseParams,
  FilterQueryParams,
  getSortOption,
  UpdateCourseParams,
} from '@/src/shared/types';

import { CourseItemData } from '../types';

interface FetchCoursesResponse {
  courses?: CourseItemData[];
  total?: number;
}

interface DashboardOverview {
  cardItems: {
    totalCourses: number;
    totalCompleted: number;
    totalPending: number;
    totalHours: number;
  };
  chartData: {
    month: string;
    hours: number;
  }[];
}

interface CourseStatsOverview {
  cardItems: {
    totalCourses: number;
    totalViews: number;
    totalRevenue: number;
    totalPending: number;
  };
  chartData: {
    status: CourseStatus;
    count: number;
  }[];
}

export async function fetchCourse(
  params: FilterQueryParams,
): Promise<FetchCoursesResponse | undefined> {
  try {
    connectToDatabase();
    const { level, limit = 10, page = 1, search, sort, status } = params;
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
      .sort(getSortOption(sort));

    const total = await CourseModel.countDocuments(query);

    return {
      courses: parseData(courses),
      total,
    };
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
        populate: {
          path: 'user',
          model: UserModel,
          select: 'name avatar',
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

export async function fetchDashboardOverview({
  clerkId,
}: {
  clerkId?: string;
}): Promise<DashboardOverview | undefined | null> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: clerkId });

    if (!findUser) return null;

    const userCourses = await HistoryModel.distinct('course', {
      user: findUser._id,
    });

    const totalCourses = userCourses.length;

    const totalCompleted = await HistoryModel.countDocuments({
      user: findUser._id,
    });

    const totalLessonsInUserCourses = await LessonModel.countDocuments({
      course: { $in: userCourses },
      _destroy: false,
    });

    const totalPending = totalLessonsInUserCourses - totalCompleted;

    const hourStats = await HistoryModel.aggregate([
      { $match: { user: findUser._id } },
      {
        $lookup: {
          from: 'lessons',
          localField: 'lesson',
          foreignField: '_id',
          as: 'lessonData',
        },
      },
      { $unwind: '$lessonData' },
      {
        $group: {
          _id: null,
          totalSeconds: { $sum: '$lessonData.duration' },
        },
      },
    ]);
    const totalHours = Math.round((hourStats[0]?.totalSeconds ?? 0) / 60);

    const monthlyHours = await HistoryModel.aggregate([
      { $match: { user: findUser._id } },
      {
        $lookup: {
          from: 'lessons',
          localField: 'lesson',
          foreignField: '_id',
          as: 'lessonData',
        },
      },
      { $unwind: '$lessonData' },
      {
        $group: {
          _id: {
            month: { $month: '$create_at' },
            year: { $year: '$create_at' },
          },
          totalSeconds: { $sum: '$lessonData.duration' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const fullYear = monthNames.map((month) => ({
      month,
      hours: 0,
    }));

    for (const item of monthlyHours) {
      fullYear[item._id.month - 1].hours = Math.round(item.totalSeconds / 60);
    }

    const chartData = fullYear;

    return {
      cardItems: {
        totalCourses,
        totalCompleted,
        totalPending,
        totalHours,
      },
      chartData,
    };
  } catch (error) {
    console.log('🚀 ~ fetchDashboardOverview ~ error:', error);
  }
}

export async function fetchCourseStats(): Promise<
  CourseStatsOverview | undefined
> {
  try {
    connectToDatabase();

    const totalCourses = await CourseModel.countDocuments({ _destroy: false });

    const totalViewsResult = await CourseModel.aggregate([
      { $match: { _destroy: false } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);
    const totalViews = totalViewsResult[0]?.totalViews ?? 0;

    const revenueResult = await CourseModel.aggregate([
      { $match: { _destroy: false, status: CourseStatus.APPROVED } },
      { $group: { _id: null, totalRevenue: { $sum: '$price' } } },
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue ?? 0;

    const statusBreakdown = await CourseModel.aggregate([
      { $match: { _destroy: false } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const totalPending =
      statusBreakdown.find((item) => item._id === CourseStatus.PENDING)
        ?.count ?? 0;

    const chartData = statusBreakdown.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    return {
      cardItems: {
        totalCourses,
        totalViews,
        totalRevenue,
        totalPending,
      },
      chartData,
    };
  } catch (error) {
    console.log('🚀 ~ fetchCourseStats ~ error:', error);
  }
}
