"use server";
import Order from "@/src/database/order.md";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/src/types";

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
  }
}
