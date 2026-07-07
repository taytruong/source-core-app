export interface FilterQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
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
  icon?: React.ReactNode;
  onlyIcon?: boolean;
}
