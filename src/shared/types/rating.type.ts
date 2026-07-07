import { RatingStatus } from '../constants';

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
