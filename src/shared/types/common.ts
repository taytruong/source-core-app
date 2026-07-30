import { LucideIcon } from 'lucide-react';

import { UserRole } from '../constants';

export interface FilterQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
  level?: string;
  sort?: SortQueryParams;
  role?: string;
}

export type SortQueryParams =
  | 'recent'
  | 'oldest'
  | 'price_asc'
  | 'price_desc'
  | 'title_asc'
  | 'title_desc'
  | 'name_asc'
  | 'name_desc';

export const SORT_MAP: Record<SortQueryParams, Record<string, 1 | -1>> = {
  recent: { create_at: -1 },
  oldest: { create_at: 1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  title_asc: { title: 1 },
  title_desc: { title: -1 },
  name_asc: { name: 1 },
  name_desc: { name: -1 },
};

export const getSortOption = (sort?: SortQueryParams) =>
  SORT_MAP[sort ?? 'recent'];

export type BadgeStatusVariant = 'default' | 'success' | 'warning' | 'danger';

export interface QuerySearchParams {
  searchParams: FilterQueryParams;
}

export type RatingIcon = 'awesome' | 'good' | 'meh' | 'bad' | 'terrible';

export interface MenuItemProps {
  url: string;
  title: string;
  title2?: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
  role?: UserRole[];
}

export interface StorageLesson {
  course: string;
  lesson: string;
}

export interface StatCardConfig {
  key: string;
  title: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  formatter?: (value: number) => string | number;
  subtext?: string | ((value: number) => string);
}
