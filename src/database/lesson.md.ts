import { Document, model, models, Schema, Types } from "mongoose";
import { ELessonType } from "../types/enum";

export interface ILesson extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  _destroy: boolean;
  lecture: Schema.Types.ObjectId;
  type: ELessonType;
  order: number;
  duration: number;
  video_url: string;
  create_at: Date;
  course: Schema.Types.ObjectId;
  content: string;
}

const lessonSchema = new Schema<ILesson>({
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
    ref: "Course",
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  },
  order: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: Object.values(ELessonType),
    default: ELessonType.VIDEO,
  },
});

const Lesson = models.Lesson || model<ILesson>("Lesson", lessonSchema);
export default Lesson;
