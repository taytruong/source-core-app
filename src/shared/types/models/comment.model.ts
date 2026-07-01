import { Document, Schema, Types } from 'mongoose';

import { CommentStatus } from '../../constants';

export interface CommentModelProps extends Document {
  _id: Types.ObjectId;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: CommentStatus;
  created_at: Date;
  parentId?: Schema.Types.ObjectId;
  level: number;
}
