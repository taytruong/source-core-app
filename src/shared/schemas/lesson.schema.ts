import { model, models, Schema } from 'mongoose';

import { LessonType } from '../constants';
import { LessonModelProps } from '../types';

const lessonSchema = new Schema<LessonModelProps>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  duration: {
    type: Number,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture',
  },
  order: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: Object.values(LessonType),
    default: LessonType.VIDEO,
  },
});

export const LessonModel =
  models.Lesson || model<LessonModelProps>('Lesson', lessonSchema);
