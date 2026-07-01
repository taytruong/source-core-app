import { Document, Schema, Types } from 'mongoose';

import { RatingStatus } from '../../constants';

export interface RatingModelProps extends Document {
  _id: Types.ObjectId;
  rate: number;
  content: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  status: RatingStatus;
  create_at: Date;
}
