import { UserRole, UserStatus } from './enum';

export const userRoleOptions = [
  { value: UserRole.USER, title: 'User', className: 'text-green-500' },
  { value: UserRole.ADMIN, title: 'Admin', className: 'text-yellow-500' },
];

export const userStatusOptions = [
  { value: UserStatus.ACTIVE, title: 'Active', className: 'text-green-500' },
  {
    value: UserStatus.UNACTIVE,
    title: 'Inactive',
    className: 'text-orange-500',
  },
  { value: UserStatus.BANNED, title: 'Banned', className: 'text-red-500' },
];
