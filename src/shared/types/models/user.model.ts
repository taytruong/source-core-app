import { Document, Schema, Types } from 'mongoose';

import { UserRole, UserStatus } from '../../constants';

export interface UserModelProps extends Document {
  _id: Types.ObjectId;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: UserStatus;
  role: UserRole;
  create_at: Date;
}
