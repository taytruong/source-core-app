import { model, models, Schema } from 'mongoose';

import { RatingStatus } from '../constants';
import { RatingModelProps } from '../types';

const ratingSchema = new Schema<RatingModelProps>({
  rate: {
    type: Number,
    default: 5,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(RatingStatus),
    default: RatingStatus.UNACTIVE,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

export const RatingModel =
  models.Rating || model<RatingModelProps>('Rating', ratingSchema);
