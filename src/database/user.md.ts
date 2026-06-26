import { Document, model, models, Schema, Types } from "mongoose";
import { EUserRole, EUserStatus } from "../types/enum";

export interface IUser extends Document {
  _id: Types.ObjectId;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: EUserStatus;
  role: EUserRole;
  create_at: Date;
}

const useSchema = new Schema<IUser>({
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
      ref: "Course", // reference to file has name is course (course.md.ts)
    },
  ],
  create_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole), // lấy 1 trong các values của EUserRole
    default: EUserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(EUserStatus), // lấy 1 trong các values của EUserStatus
    default: EUserStatus.ACTIVE,
  },
});

const User = models.User || model<IUser>("User", useSchema);
export default User;
