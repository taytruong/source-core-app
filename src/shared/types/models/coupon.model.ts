import { Document, Schema, Types } from 'mongoose';

import { CouponType } from '../../constants';

export interface CouponModelProps extends Document {
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
  type: CouponType;
  value: number;
}
