import { RatingStatus } from '../constants';
import { UserModelProps } from './models';

export type CreateRatingParams = {
  rate: number;
  content: string;
  user: string;
  course: string;
};

export type RatingItemData = {
  _id: string;
  content: string;
  rate: number;
  create_at: string;
  course: {
    title: string;
    slug: string;
  };
  user: {
    name: string;
  };
  status: RatingStatus;
};

export type UpdateRoleParams = {
  userId: string;
  updateData: Partial<UserModelProps>;
  path?: string;
};

export type UpdateStatusUserParams = {
  userId: string;
  updateData: Partial<UserModelProps>; // Partial : from must to option
  path?: string;
};
