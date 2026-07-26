export interface FilterQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
  level?: string;
  sort?: SortQueryParams;
}

export type SortQueryParams = 'recent' | 'oldest';
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
}

export interface StorageLesson {
  course: string;
  lesson: string;
}
