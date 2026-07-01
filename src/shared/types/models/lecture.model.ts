import { Document, Schema, Types } from 'mongoose';

export interface LectureModelProps extends Document {
  _id: Types.ObjectId;
  title: string;
  create_at: Date;
  _destroy: boolean;
  course: Schema.Types.ObjectId;
  lessons: Schema.Types.ObjectId[];
  order: number;
}
