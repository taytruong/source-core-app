import { model, models, Schema } from 'mongoose';

import { LectureModelProps } from '../types/models/lecture.model';

const lectureSchema = new Schema<LectureModelProps>({
  title: {
    type: String,
    required: true,
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
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
  order: {
    type: Number,
    default: 0,
  },
});

export const LectureModel =
  models.Lecture || model<LectureModelProps>('Lecture', lectureSchema);
