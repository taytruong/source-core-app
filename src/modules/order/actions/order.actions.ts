'use server';

import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { OrderStatus } from '@/src/shared/constants';
import { connectToDatabase } from '@/src/shared/lib';
import {
  CouponModel,
  CourseModel,
  OrderModel,
  UserModel,
} from '@/src/shared/schemas';
import {
  CreateOrderParams,
  FilterQueryParams,
  getSortOption,
  OrderItemData,
  OrderStatsOverview,
  UpdateOrderParams,
  UserItemData,
} from '@/src/shared/types';

interface FetchOrdersResponse {
  total: number;
  orders: OrderItemData[];
}

export async function fetchOrder(
  params: FilterQueryParams,
): Promise<FetchOrdersResponse | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, sort, status } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof CourseModel> = {};

    if (search) {
      query.$or = [{ code: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const orders = await OrderModel.find(query)
      .populate({
        model: CourseModel,
        select: 'title',
        path: 'course',
      })
      .populate({
        path: 'user',
        model: UserModel,
        select: 'name',
      })
      .populate({
        path: 'coupon',
        select: 'code',
      })
      .sort(getSortOption(sort))
      .skip(skip)
      .limit(limit);

    const total = await OrderModel.countDocuments(query);

    return {
      orders: JSON.parse(JSON.stringify(orders)),
      total,
    };
  } catch (error) {
    console.log('🚀 ~ fetchOrder ~ error:', error);
  }
}

export async function createOrder(params: CreateOrderParams) {
  try {
    connectToDatabase();
    if (!params.coupon) delete params.coupon;
    const newOrder = await OrderModel.create(params);

    // used apply coupon
    if (params.coupon) {
      await CouponModel.findByIdAndUpdate(params.coupon, {
        $inc: { used: 1 },
      });
    }

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log('🚀 ~ createOrder ~ error:', error);
  }
}

export async function updateOrder({ orderId, status }: UpdateOrderParams) {
  try {
    connectToDatabase();
    const findOrder = await OrderModel.findById(orderId)
      .populate({
        path: 'course',
        model: CourseModel,
        select: '_id',
      })
      .populate({
        path: 'user',
        model: UserModel,
        select: '_id',
      });

    if (!findOrder) return;
    if (findOrder.status === OrderStatus.CANCEL) return;

    const findUser: UserItemData | null = await UserModel.findById(
      findOrder.user._id,
    );

    if (!findUser) return;

    await OrderModel.findByIdAndUpdate(orderId, {
      status,
    });

    if (
      status === OrderStatus.COMPLETE &&
      findOrder.status === OrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }

    if (
      status === OrderStatus.CANCEL &&
      findOrder.status === OrderStatus.COMPLETE
    ) {
      findUser.courses = findUser.courses.filter(
        (element) => element.toString() !== findOrder.course._id.toString(),
      );
      await findUser.save();
    }

    revalidatePath('/manage/order');

    return {
      success: true,
    };
  } catch (error) {
    console.log('🚀 ~ updateOrder ~ error:', error);
  }
}

export async function getOrderDetails({
  code,
}: {
  code: string;
}): Promise<OrderItemData | undefined> {
  try {
    connectToDatabase();
    const order = await OrderModel.findOne({ code }).populate({
      path: 'course',
      select: 'title slug',
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log('🚀 ~ getOrderDetails ~ error:', error);
  }
}

export async function getPendingOrderByUserAndCourse({
  courseId,
  userId,
}: {
  userId: string;
  courseId: string;
}) {
  try {
    connectToDatabase();

    const order = await OrderModel.findOne({
      user: userId,
      course: courseId,
      status: OrderStatus.PENDING,
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log('🚀 ~ getPendingOrderByUserAndCourse ~ error:', error);

    return null;
  }
}

export async function fetchOrderStats(): Promise<
  OrderStatsOverview | undefined
> {
  try {
    connectToDatabase();

    const totalOrders = await OrderModel.countDocuments();

    const revenueResult = await OrderModel.aggregate([
      { $match: { status: OrderStatus.COMPLETE } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue ?? 0;

    const uniqueBuyers = await OrderModel.distinct('user');
    const totalUsers = uniqueBuyers.length;

    const statusBreakdown = await OrderModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const totalPending =
      statusBreakdown.find((item) => item._id === OrderStatus.PENDING)?.count ??
      0;

    const chartData = statusBreakdown.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    return {
      cardItems: {
        totalOrders,
        totalRevenue,
        totalUsers,
        totalPending,
      },
      chartData,
    };
  } catch (error) {
    console.log('🚀 ~ fetchOrderStats ~ error:', error);
  }
}
