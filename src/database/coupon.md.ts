import { Document, model, models, Schema, Types } from "mongoose";
import { ECouponType } from "../types/enum";

export interface ICoupon extends Document {
  _id: Types.ObjectId;
  title: string;
  code: string;
  create_at: Date;
  start_date: Date;
  end_date: Date;
  used: number;
  active: boolean;
  limit: number;
  courses: Schema.Types.ObjectId[];
  type: ECouponType;
  value: number;
}

const couponSchema = new Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
  },
  limit: {
    type: Number,
  },
  used: {
    type: Number,
    default: 0,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  type: {
    type: String,
    enum: Object.values(ECouponType),
    default: ECouponType.PERCENT,
  },
  value: {
    type: Number,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

const Coupon = models.Coupon || model<ICoupon>("Coupon", couponSchema);
export default Coupon;
