import { BadgeStatusVariant, RatingIcon } from '../types';
import { RatingStatus } from './enum';

export const ratingList: {
  title: RatingIcon;
  value: number;
}[] = [
  {
    title: 'awesome',
    value: 5,
  },
  {
    title: 'good',
    value: 4,
  },
  {
    title: 'meh',
    value: 3,
  },
  {
    title: 'bad',
    value: 2,
  },
  {
    title: 'terrible',
    value: 1,
  },
];

export const ratingStatus: {
  title: string;
  value: RatingStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: 'Active',
    value: RatingStatus.ACTIVE,
    className: 'text-green-500',
    variant: 'success',
  },
  {
    title: 'Inactive',
    value: RatingStatus.UNACTIVE,
    className: 'text-orange-500',
    variant: 'warning',
  },
];
