import { Document, model, models, Schema, Types } from "mongoose";

import { ECommentStatus } from "@/src/shared/types/enum";

export interface Comment extends Document {
  _id: Types.ObjectId;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: ECommentStatus;
  create_at: Date;
  parentId?: Schema.Types.ObjectId;
  level: number;
}

const commentSchema = new Schema<Comment>({
  content: {
    type: String,
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: Object.values(ECommentStatus),
    default: ECommentStatus.PENDING,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: Number,
    default: 0,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
});

const CommentSchema =
  models.Comment || model<Comment>("Comment", commentSchema);

export default CommentSchema;
