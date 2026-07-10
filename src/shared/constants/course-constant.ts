import { BadgeStatusVariant } from '../types';
import { CourseLevel, CourseStatus } from './enum';

export const courseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: 'Approved',
    value: CourseStatus.APPROVED,
    className: 'text-green-500',
    variant: 'success',
  },
  {
    title: 'Pending',
    value: CourseStatus.PENDING,
    className: 'text-orange-500',
    variant: 'warning',
  },
  {
    title: 'Rejected',
    value: CourseStatus.REJECTED,
    className: 'text-red-500',
    variant: 'danger',
  },
];

export const courseLevel: {
  title: string;
  value: CourseLevel;
}[] = [
  {
    title: 'Beginner',
    value: CourseLevel.BEGINNER,
  },
  {
    title: 'Intermediate',
    value: CourseLevel.INTERMEDIATE,
  },
  {
    title: 'Advanced',
    value: CourseLevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<CourseLevel, string> = {
  [CourseLevel.ADVANCED]: 'Advanced',
  [CourseLevel.INTERMEDIATE]: 'Intermediate',
  [CourseLevel.BEGINNER]: 'Beginner',
};
