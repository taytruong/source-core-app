import { UserRole, UserStatus } from './enum';

export const userRoleOptions = [
  { value: UserRole.USER, title: 'User' },
  { value: UserRole.ADMIN, title: 'Admin' },
];

export const userStatusOptions = [
  { value: UserStatus.ACTIVE, title: 'Active' },
  { value: UserStatus.UNACTIVE, title: 'Inactive' },
  { value: UserStatus.BANNED, title: 'Banned' },
];
