import { Document, Schema, Types } from 'mongoose';

import { LessonType } from '../../constants';

export interface LessonModelProps extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  _destroy: boolean;
  lecture: Schema.Types.ObjectId;
  type: LessonType;
  order: number;
  duration: number;
  video_url: string;
  create_at: Date;
  course: Schema.Types.ObjectId;
  content: string;
}
