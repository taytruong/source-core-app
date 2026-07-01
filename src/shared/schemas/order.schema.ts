import { Document, Schema, Types } from 'mongoose';
import { OrderStatus } from '../constants';

export interface OrderModelProps extends Document {
  _id: Types.ObjectId;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: OrderStatus;
  create_at: Date;
  total: number;
  amount: number;
  discount: number;
  coupon?: Schema.Types.ObjectId;
}
