'use server';

import { QueryFilter } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/src/shared/lib';
import { CouponModel } from '@/src/shared/schemas';
import { FilterQueryParams } from '@/src/shared/types';
import {
  CouponItemData,
  CreateCouponParams,
  UpdateCouponParams,
} from '@/src/shared/types/coupon.type';

export async function createCoupon(params: CreateCouponParams) {
  try {
    connectToDatabase();
    const existCouppon = await CouponModel.findOne({ code: params.code });

    if (existCouppon?.code) {
      return { error: 'Mã giảm giá đã tồn tại !' };
    }
    const couponRegex = /^[\dA-Z]{3,10}$/;

    if (!couponRegex.test(params.code)) {
      return { error: 'Mã giảm giá không hợp lệ !' };
    }
    const newCoupon = await CouponModel.create(params);

    revalidatePath('/manage/coupon');

    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log('🚀 ~ createCoupon ~ error:', error);
  }
}

export async function updateCoupon(params: UpdateCouponParams) {
  try {
    connectToDatabase();
    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      params._id,
      params.updateData,
    );

    revalidatePath('/manage/coupon');

    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log('🚀 ~ updateCoupon ~ error:', error);
  }
}

export async function getCoupons(params: FilterQueryParams): Promise<
  | {
      coupons: CouponItemData[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { active: isActive, limit = 10, page = 1, search } = params;
    const skip = (page - 1) * limit;
    const query: QueryFilter<typeof CouponModel> = {};

    if (search) {
      // hoặc = lấy ra code của Coupon
      query.$or = [{ code: { $regex: search, $options: 'i' } }];
    }

    if (isActive) query.active = Boolean(Number(isActive));

    const coupons = await CouponModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });

    const total = await CouponModel.countDocuments(query);

    return {
      coupons: JSON.parse(JSON.stringify(coupons)),
      total,
    };
  } catch (error) {
    console.log('🚀 ~ getCoupons ~ error:', error);
  }
}

export async function getCouponByCode(params: {
  code: string;
}): Promise<CouponItemData | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await CouponModel.findOne({
      code: params.code,
    }).populate({
      path: 'courses',
      select: '_id title',
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));

    return coupon;
  } catch (error) {
    console.log('🚀 ~ getCouponByCode ~ error:', error);
  }
}
export async function getValidateCode(params: {
  code: string;
  courseId: string;
}): Promise<CouponItemData | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await CouponModel.findOne({
      code: params.code,
    }).populate({
      path: 'courses',
      select: '_id title',
    });
    const coupon: CouponItemData = JSON.parse(JSON.stringify(findCoupon));
    const couponCourses = coupon?.courses.map((course) => course._id);
    let isActive = true;

    if (!couponCourses.some((id) => id.equals(params.courseId))) {
      isActive = false;
    }
    if (!coupon?.active) isActive = false;
    if (coupon?.used >= coupon?.limit) isActive = false;
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;

    return isActive ? coupon : undefined;
  } catch (error) {
    console.log('🚀 ~ createCoupon ~ error:', error);
  }
}

export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await CouponModel.findOneAndDelete({ code });
    revalidatePath('/manage/coupon');
  } catch (error) {
    console.log('🚀 ~ createCoupon ~ error:', error);
  }
}
