import { Document, Schema, Types } from 'mongoose';

export interface HistoryModelProps extends Document {
  _id: Types.ObjectId;
  create_at: Date;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
