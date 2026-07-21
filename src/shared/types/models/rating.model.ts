import { Document, Schema, Types } from 'mongoose';

import { RatingStatus } from '../../constants';
import { UserModelProps } from './user.model';

export interface RatingModelProps extends Document {
  _id: Types.ObjectId;
  rate: number;
  content: string;
  user: UserModelProps;
  course: Schema.Types.ObjectId;
  status: RatingStatus;
  create_at: Date;
}
