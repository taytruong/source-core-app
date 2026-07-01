import { model, models, Schema } from 'mongoose';

import { UserRole, UserStatus } from '../constants';
import { UserModelProps } from '../types';

const useSchema = new Schema<UserModelProps>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true, // unique là ko dc trùng
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course', // reference to file has name is course (course.md.ts)
    },
  ],
  create_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(UserRole), // lấy 1 trong các values của UserRole
    default: UserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(UserStatus), // lấy 1 trong các values của EUserStatus
    default: UserStatus.ACTIVE,
  },
});

export const UserModel =
  models.User || model<UserModelProps>('User', useSchema);
