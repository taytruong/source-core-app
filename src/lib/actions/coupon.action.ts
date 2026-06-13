"use server";

import Coupon, { ICoupon } from "@/src/database/coupon.md";
import { connectToDatabase } from "../mongoose";

export async function createCoupon(params: any) {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log("🚀 ~ createCoupon ~ error:", error);
  }
}

export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.find(params);
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log("🚀 ~ createCoupon ~ error:", error);
  }
}
