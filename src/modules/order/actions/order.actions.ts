'use server';
import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { OrderStatus } from '@/src/shared/constants';
import { connectToDatabase } from '@/src/shared/lib/mongoose';
import { CouponModel, CourseModel, UserModel } from '@/src/shared/schemas';
import { OrderModel } from '@/src/shared/types';
import { CreateOrderParams } from '@/src/types';

export async function fetchOrder(params: any) {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
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
      .sort({ create_at: -1 })
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
    // if (!params.coupon) delete params.coupon;
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

export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
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

    const findUser = await UserModel.findById(findOrder.user._id);

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
        (element: any) =>
          element.toString() !== findOrder.course._id.toString(),
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

export async function getOrderDetails({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await OrderModel.findOne({ code }).populate({
      path: 'course',
      select: 'title',
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log('🚀 ~ getOrderDetails ~ error:', error);
  }
}
