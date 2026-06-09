"use server";
import Order from "@/src/database/order.md";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/src/types";
import Course from "@/src/database/course.md";

export async function fetchOrder() {
  try {
    connectToDatabase();
    const orders = await Order.find().populate({
      model: Course,
      select: "title",
      path: "course",
    });
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
