"use server";
import Order from "@/src/database/order.md";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/src/types";
import Course from "@/src/database/course.md";
import User from "@/src/database/user.modal";
import { QueryFilter } from "mongoose";
import { EOrderStatus } from "@/src/types/enum";
import { revalidatePath } from "next/cache";

export async function fetchOrder(params: any) {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof Course> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const orders = await Order.find(query)
      .populate({
        model: Course,
        select: "title",
        path: "course",
      })
      .populate({
        path: "user",
        model: User,
        select: "name",
      })
      .skip(skip)
      .limit(limit);
    return orders;
  } catch (error) {
    console.log("🚀 ~ fetchOrder ~ error:", error);
  }
}

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
  }
}

export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: EOrderStatus;
}) {
  try {
    connectToDatabase();
    const findOrder = await Order.findById(orderId)
      .populate({
        path: "course",
        model: Course,
        select: "_id",
      })
      .populate({
        path: "user",
        model: User,
        select: "_id",
      });
    if (!findOrder) return;
    if (findOrder.status === EOrderStatus.CANCEL) return;

    const findUser = await User.findById(findOrder.user._id);

    await Order.findByIdAndUpdate(orderId, {
      status,
    });

    if (
      status === EOrderStatus.COMPLETE &&
      findOrder.status === EOrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }

    if (
      status === EOrderStatus.CANCEL &&
      findOrder.status === EOrderStatus.COMPLETE
    ) {
      findUser.courses = findUser.courses.filter(
        (el: any) => el.toString() !== findOrder.course._id.toString(),
      );
      await findUser.save();
    }

    revalidatePath("/manage/order");
    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ updateOrder ~ error:", error);
  }
}

export async function getOrderDetails({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await Order.findOne({ code }).populate({
      path: "course",
      select: "title",
    });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log("🚀 ~ getOrderDetails ~ error:", error);
  }
}
